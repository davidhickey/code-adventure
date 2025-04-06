export type ApodData = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  thumbnail_url?: string;
};

export async function fetchApodData({
  count,
  noCache,
}: {
  count?: number;
  noCache?: boolean;
}): Promise<ApodData & ApodData[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nasa/apod`);
  if (count) url.searchParams.append("count", count.toString());
  if (noCache) url.searchParams.append("noCache", "true");
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(
      `Failed to fetch APOD data: ${response.statusText}. Status code: ${response.status}. On Base URL - ${process.env.NEXT_PUBLIC_BASE_URL}. Url: ${response.url}, Type: ${response.type}.`
    );
  }

  return response.json();
}
