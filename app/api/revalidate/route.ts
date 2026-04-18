import { revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';
import { NextResponse, type NextRequest } from 'next/server';
import { SANITY_TAG } from '@/sanity/client';

// set SANITY_REVALIDATE_SECRET in Vercel, and in your Sanity webhook config
// (Manage → API → Webhooks, body secret with same value).

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 });
    }
    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    revalidateTag(SANITY_TAG);
    return NextResponse.json({ revalidated: true, type: body._type });
  } catch (err: any) {
    return new NextResponse(err?.message ?? 'Error', { status: 500 });
  }
}
