"use client";
import { useState } from "react";
import useDisableBodyScroll from "@/components/hooks/useDisableBodyScroll";
import {
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";
import { renderNextImage, fetchMoreApodData } from "./helpers";
import { UnstableInfiniteScroll as InfiniteScroll } from "react-photo-album/scroll";
import Image from "next/image";


export type ImageGalleryItem = {
  src: string;
  hdUrl: string;
  alt: string;
  width: number;
  height: number;
  date?: string;
  description?: string;
  title?: string;
};

const ImageGallery = ({album}: {album: ImageGalleryItem[]}) => {
  const [selectedImage, setSelectedImage] = useState<ImageGalleryItem | null>(null);
  useDisableBodyScroll(selectedImage !== null);

  return (
    <div className="image-gallery-container text-lPrimaryGreen dark:text-dPrimaryGray">
      <div className="photo-album-wrapper">
      <InfiniteScroll photos={album} fetch={fetchMoreApodData} onClick={({photo}) => setSelectedImage(photo ?? null)} loading={<div className="animate-pulse w-full text-center py-8 pt-12 text-2xl sm:text-3xl">Loading...</div>}>
        <RowsPhotoAlbum
          photos={[]}
          breakpoints={[600, 1200]}
          render={{ 
            image: renderNextImage,
            extras: (_, { photo: {date}}: {photo:ImageGalleryItem}) => (
              date ? <div className="absolute bottom-3 right-3 p-1 sm:p-2 text-white text-xs bg-black bg-opacity-50 rounded-br-md rounded-tl-md">{new Date(date).toLocaleDateString()}</div> : null
            ),
          }}
          defaultContainerWidth={1200}
          padding={4}
          spacing={0}
        />
      </InfiniteScroll>
      </div>
      {selectedImage &&
        <div className="space-gallery-modal fixed inset-0 bg-black z-50 h-full w-full">
          <button onClick={() => setSelectedImage(null)} className="absolute z-[2] top-1 right-2 text-white bg-black bg-opacity-50 rounded-full h-[30px] w-[30px] flex items-center justify-center">X</button>
          <div className="modal-content-wrapper h-full w-full overflow-y-scroll flex items-start sm:items-center justify-center p-4">
          <div className="modal-content flex flex-col items-center justify-center gap-4 z-[1]">
            <div className="relative h-[50vh] w-full">
              <Image
                alt=""
                src={selectedImage.hdUrl || selectedImage.src}
                className="rounded-lg object-contain !w-fit ml-auto mr-auto"
                fill={true}
              />
            </div>
            <div className="modal-text max-w-[48rem] px-6 flex flex-col gap-2">
              <h2 className="text-xl sm:text-3xl font-semibold text-white text-center">{selectedImage.title}</h2>
              {selectedImage.date && <div className="text-sm text-white text-center">Published: {new Date(selectedImage.date).toLocaleDateString()}</div>}
              <p className="text-sm text-white text-center">{selectedImage.description}</p>
            </div>
          </div>
          </div>
        </div>
      }
    </div>
  );
}

export default ImageGallery;