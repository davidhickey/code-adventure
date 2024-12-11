import { ApodData } from "@/components/HomePage";
import { ImageGalleryAlbum } from "@/components/sections/ImageGallery";
import Image from "next/image";
import {
  RenderImageContext,
  RenderImageProps,
} from "react-photo-album";

export const transformNasaImagesToPhotoAlbum = (nasaImages: ApodData[]): ImageGalleryAlbum => {
  //filter out non image types
  const justImages = nasaImages.filter((image) => image.media_type === "image");
  return justImages.map((image) => {
    return {
      src: image.url,
      alt: image.title,
      width: 400,
      height: 400,
      date: image.date,
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
        className="!width-auto !height-full object-cover !object-center"
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
      />
    </div>
  );
}