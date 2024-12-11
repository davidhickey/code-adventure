import HeroSection from "@/components/sections/Hero";
import FeatureSection from "../sections/Feature";
import CalendarWidget from "../CalendarWidget";

export type ApodData = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  thumbnail_url?: string;
}

export async function fetchApodData(count?:number): Promise<ApodData & ApodData[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nasa/apod`);
  if(count) url.searchParams.append("count", count.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch APOD data: ${response.statusText}. Status code: ${response.status}. On Base URL - ${process.env.NEXT_PUBLIC_BASE_URL}. Url: ${response.url}, Type: ${response.type}.`);
  }

  return response.json();
}



const HomePage = async ({children}:{children?: React.ReactNode}) => {

  const apodData = await fetchApodData();

  return (
    <div>
      {apodData  && <HeroSection apodData={apodData} />}
      <FeatureSection />
      <CalendarWidget />
      {children && <div>{children}</div>}
    </div>
  );
}

export default HomePage;
