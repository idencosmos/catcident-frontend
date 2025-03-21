import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    return NextResponse.json(
      { 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        nextVersion: process.env.NEXT_RUNTIME || 'unknown'
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    );
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      { status: "unhealthy", error: "Internal server error" },
      { status: 500 }
    );
  }
}
