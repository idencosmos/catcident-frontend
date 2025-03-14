// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// This is the secret token that will be used to authenticate revalidation requests
// It should match the NEXTJS_REVALIDATE_TOKEN in your Django settings
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET_TOKEN;

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ") || !REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Extract and verify token
    const token = authHeader.substring(7);
    if (token !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const tag = body.tag;

    if (!tag || typeof tag !== "string") {
      return NextResponse.json(
        { error: "Invalid tag" },
        { status: 400 }
      );
    }

    // Revalidate the tag
    revalidateTag(tag);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      tag,
    });
  } catch (error) {
    console.error("[Revalidate API]", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: (error as Error).message },
      { status: 500 }
    );
  }
}