import type { NextPage } from "next";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/sections/ImageGallery";
import { fetchApodData } from "@/lib/apis/nasa";
import { transformNasaImagesToPhotoAlbum } from "@/components/sections/ImageGallery/helpers";

const SpaceGallery: NextPage = async () => {
  const nasaImages = await fetchApodData({ count: 20 });
  if (!nasaImages) {
    return notFound();
  }

  return (
    <>
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
