import type { NextPage } from "next";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/sections/ImageGallery";
import { fetchApodData } from "@/components/HomePage";
import { transformNasaImagesToPhotoAlbum } from "@/components/sections/ImageGallery/helpers";

const SpaceGallery: NextPage = async () => {
  const nasaImages = await fetchApodData(20);
  if (!nasaImages) {
    notFound();
  }

  const photoAlbum = transformNasaImagesToPhotoAlbum(nasaImages);

  return (
    <>
      {nasaImages?.length > 0 && <ImageGallery title={"NASA Pictures of the Day"} album={photoAlbum} />}
    </>
  );
};
  
  export default SpaceGallery;