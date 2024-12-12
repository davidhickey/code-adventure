import HeroSection from "@/components/sections/Hero";
import FeatureSection from "../sections/Feature";
import CalendarWidget from "../CalendarWidget";
import { fetchApodData } from "@/lib/apis/nasa";


const HomePage = async ({children}:{children?: React.ReactNode}) => {

  const apodData = await fetchApodData();

  return (
    <div>
      {apodData?.url  && <HeroSection apodData={apodData} />}
      <FeatureSection />
      <CalendarWidget />
      {children && <div>{children}</div>}
    </div>
  );
}

export default HomePage;
