"use client";
import "react-photo-album/rows.css";
import Image from "next/image";
import {
  RenderImageContext,
  RenderImageProps,
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";

export type ImageGalleryAlbum = {
  src: string;
  alt: string;
  width: number;
  height: number;
}[];

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
        className="!width-auto !height-full object-cover !object-center"
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
      />
    </div>
  );
}


const ImageGallery = ({album, title}: {album: ImageGalleryAlbum, title?:string}) => {
  return (
    <div className="image-gallery-container">
      {title && <h2 className="text-3xl font-semibold text-gray-900 w-full text-center py-8">{title}</h2>}
    
      <div className="photo-album-wrapper">
        <RowsPhotoAlbum
          photos={album}
          render={{ image: renderNextImage }}
          defaultContainerWidth={1200}
        />
      </div>
    </div>
  );
}

export default ImageGallery;