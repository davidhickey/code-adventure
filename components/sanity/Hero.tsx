"use client";
import { HeroSection } from "@/studio/lib/types";
import Image from "next/image";
import { urlForImage } from "@/studio/lib/utils";
import { useContext } from "react";
import ThemeContext from "@/store";

const SanityHero: React.FC<HeroSection> = ({
  title,
  subtitle,
  bgImage,
  fullBleed = true,
}: HeroSection & { fullBleed?: boolean }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`sanity-hero-section-container relative h-[260px] sm:h-[500px] xl:h-[600px] text-lPrimaryGreen dark:text-dPrimaryGray bg-lSecCream dark:bg-dSecDarkBlue transition-all duration-300 ease-in-out 
    ${fullBleed ? "w-[calc(100%+3rem)] ml-[-1.5rem] lg:w-[calc(100%+4rem)] lg:ml-[-2rem]" : ""}`}
    >
      <div className="max-w-7xl h-full mx-auto flex flex-col items-start justify-end pb-8 sm:pb-20 xl:pb-30">
        <div className="text-container relative z-[1] flex flex-col text-left p-6 max-w-2xl gap-4 lg:p-8 lg:max-w-full">
          <h1
            className="text-3xl font-black tracking-tight leading-none sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            style={{
              color: isDarkTheme ? title.darkColor.hex : title.lightColor.hex,
            }}
          >
            {title.text}
          </h1>
          <p
            className="text-xs leading-tight sm:text-sm lg:text-[1rem] xl:text-xl"
            style={{
              color: isDarkTheme
                ? subtitle.darkColor.hex
                : subtitle.lightColor.hex,
            }}
          >
            {subtitle.text}
          </p>
        </div>
      </div>
      {bgImage && (
        <div className="absolute inset-0">
          <Image
            priority
            src={urlForImage(bgImage)?.url() as string}
            alt={"Hero Background Image"}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default SanityHero;
