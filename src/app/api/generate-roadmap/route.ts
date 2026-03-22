import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, dob, tob, mbti, persona_goal } = body;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { success: false, error: "Supabase not configured" },
      { status: 500 }
    );
  }

  const baseUrl = supabaseUrl.replace(/\/+$/, "");

  try {
    const res = await fetch(
      `${baseUrl}/functions/v1/process-roadmap`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ name, dob, tob, mbti, persona_goal }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { success: false, error: `Edge function error: ${text}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
