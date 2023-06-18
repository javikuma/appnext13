import User from '@/models/User';
import { connect, disconnect } from '@/utils/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const POST = async (request) => {
    try {
        const { name, email, password } = await request.json();
        await connect();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return new NextResponse(
            { success: true, data: newUser, message: 'User has been created' },
            { status: 201 }
        );
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
};
