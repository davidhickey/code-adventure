import { ApodData } from "@/components/HomePage";
import { ImageGalleryAlbum } from "@/components/sections/ImageGallery";
export const transformNasaImagesToPhotoAlbum = (nasaImages: ApodData[]): ImageGalleryAlbum => {
  //filter out non image types
  const justImages = nasaImages.filter((image) => image.media_type === "image");
  return justImages.map((image) => {
    return {
      src: image.url,
      alt: image.title,
      width: 400,
      height: 400,
    }
  });
}