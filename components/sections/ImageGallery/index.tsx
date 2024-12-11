"use client";
import {
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";
import { renderNextImage, transformNasaImagesToPhotoAlbum } from "./helpers";
import { fetchApodData } from "@/components/HomePage";
import { UnstableInfiniteScroll as InfiniteScroll } from "react-photo-album/scroll";


export type ImageGalleryAlbum = {
  src: string;
  alt: string;
  width: number;
  height: number;
  date: string;
}[];

const fetchMoreApodData = async (): Promise<ImageGalleryAlbum | null> => {
  return transformNasaImagesToPhotoAlbum(await fetchApodData(20));
}

const ImageGallery = ({album, title}: {album: ImageGalleryAlbum, title?:string}) => {
  return (
    <div className="image-gallery-container">
      {title && <h2 className="text-3xl font-semibold text-gray-900 w-full text-center py-8">{title}</h2>}
    
      <div className="photo-album-wrapper">
      <InfiniteScroll photos={album} fetch={fetchMoreApodData}>
        <RowsPhotoAlbum
          photos={[]}
          render={{ image: renderNextImage}}
          defaultContainerWidth={1200}
          padding={12}
          spacing={0}
        />
      </InfiniteScroll>
      </div>
    </div>
  );
}

export default ImageGallery;