import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const song = searchParams.get("song");
    const artist = searchParams.get("artist");

    if (!song || !artist) {
        return NextResponse.json({ error: "Song and artist are required", status: 400 });
    }

    try {
      const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
      if (!res.ok) {
          return NextResponse.json({ data:null, error: `Lyrics api req failed. ${res.statusText}`, status: res.status });
      }
      const data = await res.json();
      return NextResponse.json({ data, status: 200 });
    } catch (error) {
      return NextResponse.json({error, status: 500, data: null});
    }
    
}