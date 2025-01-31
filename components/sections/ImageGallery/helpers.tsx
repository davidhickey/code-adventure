import { ApodData } from "@/lib/apis/nasa";
import { ImageGalleryItem } from "@/components/sections/ImageGallery";
import Image from "next/image";
import {
  RenderImageContext,
  RenderImageProps,
} from "react-photo-album";
import { fetchApodData } from "@/lib/apis/nasa";

export const fetchMoreApodData = async (): Promise<ImageGalleryItem[] | null> => {
  return transformNasaImagesToPhotoAlbum(await fetchApodData(20));
}

export const transformNasaImagesToPhotoAlbum = (nasaImages: ApodData[]): ImageGalleryItem[] => {
  //filter out non image types
  const justImages = nasaImages.filter((image) => image.media_type === "image");
  return justImages.map((image) => {
    return {
      src: image.url,
      alt: image.title,
      width: 400,
      height: 400,
      date: image.date,
      description: image.explanation,
      title: image.title,
    }
  });
}

export const renderNextImage = (
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) => {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        height:"100%",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        className="!width-auto !height-full object-cover !object-center rounded-md cursor-pointer hover:scale-105 transition-all duration-300"
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
      />
    </div>
  );
}