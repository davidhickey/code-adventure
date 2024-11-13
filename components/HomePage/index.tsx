import HeroSection from "@/components/sections/Hero";
import FeatureSection from "../sections/Feature";

const HomePage = ({children}:{children?: React.ReactNode}) => {
  return (
      <div>
      <HeroSection />
      <FeatureSection />
      {children && <div>{children}</div>}
    </div>
  );
}

export default HomePage;
