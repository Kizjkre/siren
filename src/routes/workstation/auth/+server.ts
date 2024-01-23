import { SignJWT } from 'jose';
import type { RequestHandler } from '@sveltejs/kit';

// noinspection JSUnusedGlobalSymbols
export const POST: RequestHandler = async ({ request }: { request: Request }): Promise<any> => {
  const { addr } = await request.json();

  return new Response(JSON.stringify({
    access: await new SignJWT({ addr })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(new TextEncoder().encode(process.env.JWT_ACCESS_TOKEN))
  }));
};
