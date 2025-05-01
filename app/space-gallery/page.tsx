import type { NextPage } from "next";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/sections/ImageGallery";
import { fetchApodData } from "@/lib/apis/nasa";
import { transformNasaImagesToPhotoAlbum } from "@/components/sections/ImageGallery/helpers";
import HeroSection from "@/components/sections/Hero";
const SpaceGallery: NextPage = async () => {
  const nasaImages = await fetchApodData({ count: 20 });
  if (!nasaImages) {
    return notFound();
  }

  const heroApodData = await fetchApodData({ noCache: true });
  if (!heroApodData) {
    console.error("Failed to fetch APOD data and render it.");
    return null;
  }
  console.log('heroApodData', heroApodData);

  return (
    <>
      <HeroSection>
        <h2 className="text-xl sm:text-3xl font-semibold w-full text-center py-8">NASA Pictures of the Day</h2>
      </HeroSection>
      {nasaImages && nasaImages?.length > 0 && (
        <ImageGallery
          title={"NASA Pictures of the Day"}
          album={transformNasaImagesToPhotoAlbum(nasaImages)}
        />
      )}
    </>
  );
};

export default SpaceGallery;
