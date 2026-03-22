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

  // Only send Year 0, Q1+Q2 to avoid timeout
  const year0 = roadmap.years?.[0];
  if (!year0) {
    return NextResponse.json(
      { success: false, error: "No year data" },
      { status: 400 }
    );
  }

  const trimmedRoadmap = {
    summary: roadmap.summary,
    current_age: roadmap.current_age,
    years: [
      {
        year_label: year0.year_label,
        year_age: year0.year_age,
        title: year0.title,
        energy_tag: year0.energy_tag,
        yearly_energy: year0.yearly_energy,
        quarters: year0.quarters.slice(0, 2),
      },
    ],
  };

  const baseUrl = supabaseUrl.replace(/\/+$/, "");

  try {
    const res = await fetch(
      `${baseUrl}/functions/v1/process-find-courses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify(trimmedRoadmap),
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
