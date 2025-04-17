import { type NextRequest } from "next/server";
export async function GET(req:NextRequest): Promise<Response> {
  try {
    // NASA API URL and key
    const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';
    const NASA_API_KEY = process.env.NASA_API_KEY; // Use environment variable
    if (!NASA_API_KEY) {
      throw new Error('NASA_API_KEY is not set');
    }

    const url = new URL(`${NASA_API_URL}?api_key=${NASA_API_KEY}`);

    const searchParams = new URLSearchParams(req.nextUrl.searchParams);
    const count = searchParams.get('count');
    const noCache = searchParams.get('noCache');
    if (count) {
      url.searchParams.append('count', count);
    }

    url.searchParams.append('thumbs', 'true');

    // Fetch data from NASA's API
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: noCache ? 'no-store' : 'default',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch APOD data in route.ts: ${response.statusText}`);
    }

    const data = await response.json();

    // Respond with the data
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching APOD data in route.ts:', error.message);
    } else {
      console.error('Error fetching APOD data in route.ts:', error);
    }
    return new Response(JSON.stringify({ message: 'Error fetching Astronomy Picture of the Day' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
