import { NextResponse } from 'next/server';

export async function GET() {
    let response=NextResponse.json({"ok":"200"},{status:200})
  response.cookies.set('authToken', '', {
    path: '/',
    expires: new Date(0), // Set an expired date
  });
  return response;
}
