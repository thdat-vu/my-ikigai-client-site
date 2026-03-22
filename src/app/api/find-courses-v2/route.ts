import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const roadmap = await request.json();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { success: false, error: "Supabase not configured" },
      { status: 500 }
    );
  }

  const year0 = roadmap.years?.[0];
  if (!year0?.quarters?.length) {
    return NextResponse.json(
      { success: false, error: "No year data" },
      { status: 400 }
    );
  }

  const skills = year0.quarters
    .slice(0, 2)
    .map((q: { focus_skill: string }) => q.focus_skill)
    .filter(Boolean);

  if (skills.length === 0) {
    return NextResponse.json(
      { success: false, error: "No skills found" },
      { status: 400 }
    );
  }

  const baseUrl = supabaseUrl.replace(/\/+$/, "");

  try {
    const res = await fetch(
      `${baseUrl}/functions/v1/process-find-courses-parallel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ skills }),
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
