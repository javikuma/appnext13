import { NextResponse } from 'next/server';
import { connect, disconnect } from '@/utils/db';
import Post from '@/models/Post';

export const GET = async (request) => {
    const url = new URL(request.url);

    const username = url.searchParams.get('username');

    console.log({ username });

    try {
        await connect();
        const posts = await Post.find(username && { username: 'kuma' });
        // await disconnect();
        return NextResponse.json(
            {
                success: true,
                data: posts,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log({ error });
        return NextResponse.json('Database error!', { status: 500 });
    }
};

export const POST = async (request) => {
    const body = await request.json();

    try {
        const newPost = new Post(body);
        await connect();
        const post = await newPost.save();
        // await disconnect();
        return NextResponse.json(
            {
                success: true,
                data: post,
            },
            { status: 201 }
        );
    } catch (error) {
        console.log({ error });
        return NextResponse.json('Database error!', { status: 500 });
    }
};
