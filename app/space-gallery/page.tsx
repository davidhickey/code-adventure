import type { NextPage } from "next";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/sections/ImageGallery";

export type NasaImages = {
  collection : {
    href: string;
    items: {
      data: {
        title: string;
        description: string;
        nasa_id: string;
        date_created: string;
        location: string;
        photographer: string;
      }[];
      links: {
        href: string;
        rel: string;
        render: string;
      }[]
      href: string;
    }[]
  }
}

const getNasaImages = async (): Promise<NasaImages> => {
  const response = await fetch(`https://images-api.nasa.gov/search?q=space&media_type=image`);
  if (!response.ok) {
    throw new Error(`Failed to fetch NASA images: ${response.statusText}. Status code: ${response.status}. On Base URL - ${process.env.NEXT_PUBLIC_BASE_URL}. Url: ${response.url}, Type: ${response.type}.`);
  }
  return response.json();
}

const SpaceGallery: NextPage = async () => {
  const nasaImages = await getNasaImages();
  if (!nasaImages) {
    notFound();
  }

  const firstPageOfImages = nasaImages?.collection?.items;

  return (
    <>
      {firstPageOfImages && <ImageGallery album={firstPageOfImages} />}
    </>
  );
};
  
  export default SpaceGallery;