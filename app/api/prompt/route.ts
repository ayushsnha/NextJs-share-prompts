import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt'

export const GET = async (request:any) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');

        const headers = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store', // Disable caching
        };

        return new Response(JSON.stringify(prompts), { status: 200, headers });
    } catch (err) {
        return new Response("Failed to fetch all Prompts", { status: 500 });
    }
}