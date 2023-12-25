import { type NextRequest } from 'next/server';

import { getTitles } from '@/data/title';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = {
    type: searchParams.get('type') || '',
    genre: searchParams.get('genre') || undefined,
    page: searchParams.get('page') || '1',
  };
  try {
    const titles = await getTitles(query);
    return Response.json(titles);
  } catch (error) {
    return Response.error();
  }
}
