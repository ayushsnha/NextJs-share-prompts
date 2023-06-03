import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request: any) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const search = searchParams.get('search') || '';
    console.log(search)
    const regex = new RegExp(search, "i");
  try {
    await connectToDB();

    const prompts = await Prompt.find({ prompt: { $regex: regex } }).populate('creator');

    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Expires: '0',
      Pragma: 'no-cache',
    };

    return new Response(JSON.stringify(prompts), { status: 200, headers });
  } catch (err) {
    return new Response('Failed to fetch all Prompts', { status: 500 });
  }
};
