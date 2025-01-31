"use client";
import {
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";
import { renderNextImage, fetchMoreApodData } from "./helpers";
import { UnstableInfiniteScroll as InfiniteScroll } from "react-photo-album/scroll";


export type ImageGalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  date?: string;
  description?: string;
  title?: string;
};

const ImageGallery = ({album, title}: {album: ImageGalleryItem[], title?:string}) => {
  return (
    <div className="image-gallery-container text-lPrimaryGreen dark:text-dPrimaryGray">
      {title && <h2 className="text-3xl font-semibold w-full text-center py-8">{title}</h2>}
    
      <div className="photo-album-wrapper">
      <InfiniteScroll photos={album} fetch={fetchMoreApodData} loading={<div className="animate-pulse w-full text-center py-8 pt-12 text-2xl sm:text-3xl">Loading...</div>}>
        <RowsPhotoAlbum
          photos={[]}
          render={{ 
            image: renderNextImage,
            extras: (_, { photo: {date}}: {photo:ImageGalleryItem}) => (
              <div className="absolute bottom-3 right-3 p-2 text-white bg-black bg-opacity-50 rounded-br-md rounded-tl-md">Published: {date}</div>
            ),
          }}
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