import { NextResponse } from 'next/server';
import { connect } from '@/utils/db';
import Post from '@/models/Post';

export const GET = async (request, { params }) => {
    const { id } = params;
    // fetch

    try {
        await connect();

        const post = await Post.findById(id);
        return NextResponse.json(
            {
                success: true,
                data: post,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json('Database error!', { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { id } = params;
    console.log({ id });

    try {
        await connect();

        const post = await Post.findByIdAndDelete(id);
        return NextResponse.json(
            {
                success: true,
                message: 'Post has been deleted',
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json('Database error!', { status: 500 });
    }
};
