// frontend/src/app/api/auth/[...all]/route.ts
// This file should not exist as we're using backend auth
// Instead, we'll create a proxy to forward requests to the backend

import { NextRequest } from "next/server";

// Proxy route to forward auth requests to backend
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params = url.pathname.replace('/api/auth/', '');
  
  // Forward to backend auth
  const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${params}`, {
    method: 'GET',
    headers: {
      ...request.headers,
    },
  });
  
  return new Response(await backendResponse.text(), {
    status: backendResponse.status,
    headers: backendResponse.headers,
  });
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const params = url.pathname.replace('/api/auth/', '');
  
  // Forward to backend auth
  const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${params}`, {
    method: 'POST',
    headers: {
      ...request.headers,
      'Content-Type': 'application/json',
    },
    body: await request.text(),
  });
  
  return new Response(await backendResponse.text(), {
    status: backendResponse.status,
    headers: backendResponse.headers,
  });
}