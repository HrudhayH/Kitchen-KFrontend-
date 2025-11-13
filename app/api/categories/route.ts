import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("http://localhost:5001/api/categories", { cache: "no-store" });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: res.status });
    }

    const data = await res.json();
    // Make sure it returns an array of categories
    return NextResponse.json(data);
  } catch (error) {
    console.error("Categories API error:", error);
    return NextResponse.json({ error: "Backend not available" }, { status: 503 });
  }
}
