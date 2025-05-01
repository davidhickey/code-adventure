import type { NextPage } from "next";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/sections/ImageGallery";
import { fetchApodData } from "@/lib/apis/nasa";
import { transformNasaImagesToPhotoAlbum } from "@/components/sections/ImageGallery/helpers";
import { sanityFetch } from "@/studio/lib/query";
import { getStaticPageBySlugQuery } from "@/studio/lib/query";
import SanitySections from "@/components/sanity/Sections";
import { SanityPage } from "@/studio/lib/types";

const SpaceGallery: NextPage = async () => {
  const nasaImages = await fetchApodData({ count: 20 });
  if (!nasaImages) {
    return notFound();
  }

  const sanityPage: SanityPage = await sanityFetch({
    query: getStaticPageBySlugQuery,
    params: { slug: "space-gallery" },
  });
  const sections = sanityPage?.sections;

  return (
    <>
      {sections && sections?.length > 0 && (
        <SanitySections sections={sections} />
      )}
      {nasaImages && nasaImages?.length > 0 && (
        <ImageGallery album={transformNasaImagesToPhotoAlbum(nasaImages)} />
      )}
    </>
  );
};

export default SpaceGallery;
