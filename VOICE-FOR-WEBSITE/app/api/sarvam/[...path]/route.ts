import { NextRequest, NextResponse } from "next/server";

const SARVAM_APP_RUNTIME_BASE = "https://apps.sarvam.ai/api/app-runtime";

async function proxyToSarvam(
  request: NextRequest,
  path: string[],
): Promise<NextResponse> {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "SARVAM_API_KEY is not configured on the server" },
      { status: 500 },
    );
  }

  const upstreamPath = path.join("/");
  const upstreamUrl = new URL(`${SARVAM_APP_RUNTIME_BASE}/${upstreamPath}`);
  request.nextUrl.searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.set(key, value);
  });

  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: "GET",
    headers: {
      "X-API-Key": apiKey,
      Accept: request.headers.get("Accept") ?? "application/json",
    },
    cache: "no-store",
  });

  const body = await upstreamResponse.arrayBuffer();
  const headers = new Headers();
  const contentType = upstreamResponse.headers.get("Content-Type");
  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  return new NextResponse(body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxyToSarvam(request, path);
}
