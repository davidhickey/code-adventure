import HeroSection from "@/components/sections/Hero";
import NasaPOD from "../sections/NasaPOD";


const HomePage = async ({children}:{children?: React.ReactNode}) => {
  return (
    <div>
      <HeroSection>
        <h1 className="py-40 text-center text-5xl sm:text-8xl sm:py-60">{`Welcome :)`}</h1>
      </HeroSection>
      <HeroSection>
        <NasaPOD />
      </HeroSection>
      {children && <div>{children}</div>}
    </div>
  );
}

export default HomePage;
