import type { RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

// noinspection JSUnusedGlobalSymbols
export const POST: RequestHandler = async ({ request }: { request: Request }): Promise<any> => {
  const { access } = await request.json();

  jwt.verify(access, process.env.JWT_ACCESS_TOKEN!)

  return new Response();
};
