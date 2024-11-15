import HeroSection from "@/components/sections/Hero";
import FeatureSection from "../sections/Feature";

export type ApodData = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}



const HomePage = async ({children}:{children?: React.ReactNode}) => {
  // async function fetchApodData(): Promise<ApodData> {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nasa/apod`);
  
  //   if (!response.ok) {
  //     throw new Error(`Failed to fetch APOD data: ${response.statusText}. Status code: ${response.status}. On Base URL - ${process.env.NEXT_PUBLIC_BASE_URL}. Url: ${response.url}, Type: ${response.type}.`);
  //   }
  
  //   return response.json();
  // }

  // const apodData = await fetchApodData();
  const apodData = null;

  return (
    <div>
      {apodData  && <HeroSection apodData={apodData} />}
      <FeatureSection />
      {children && <div>{children}</div>}
    </div>
  );
}

export default HomePage;
