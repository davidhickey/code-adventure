"use client";
import { NasaImages } from "@/app/space-gallery/page";
import "react-photo-album/rows.css";
import Image from "next/image";
import {
  RenderImageContext,
  RenderImageProps,
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";

type ImageGalleryAlbum = NasaImages["collection"]["items"];

const renderNextImage = (
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
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
      />
    </div>
  );
}

const transformNasaImagesToPhotoAlbum = (nasaImages: ImageGalleryAlbum) => {
  return nasaImages.map((image) => {
    return {
      src: image.links[0].href,
      alt: image.data[0].title,
      caption: image.data[0].description,
      width: 400,
      height: 300,
    }
  });
}

const ImageGallery = ({album}: {album: ImageGalleryAlbum}) => {
  const photoAlbum = transformNasaImagesToPhotoAlbum(album);

  return (
    <RowsPhotoAlbum
      photos={photoAlbum}
      render={{ image: renderNextImage }}
      defaultContainerWidth={1200}
      // sizes={{
      //   size: "1168px",
      //   sizes: [
      //     { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
      //   ],
      // }}
    />
  );
}

export default ImageGallery;