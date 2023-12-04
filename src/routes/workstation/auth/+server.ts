import jwt from 'jsonwebtoken';
import type { RequestHandler } from '@sveltejs/kit';

// noinspection JSUnusedGlobalSymbols
export const POST: RequestHandler = async ({ request }: { request: Request }): Promise<any> => {
  const { addr } = await request.json();

  return new Response(JSON.stringify({
    access: jwt.sign({ addr }, process.env.JWT_ACCESS_TOKEN!)
  }));
};
