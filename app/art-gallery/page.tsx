import { InteractiveGallery } from "@/components/sections/InteractiveGallery";


export type ThreeImage = {
  position: number[];
  rotation: number[];
  url: string;
};
const ArtGallery = () => {

  const pexel = (id:number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
  const images: ThreeImage[] = [
    // Front
    { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel(1103970) },
    // Back
    { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430) },
    { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },
    // Left
    { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: pexel(327482) },
    { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(325185) },
    { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(358574) },
    // Right
    { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(227675) },
    { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(911738) },
    { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1738986) }
  ];

  return (
    <div className="h-full min-h-screen w-full bg-[#191920]">
      <h1>Art Gallery</h1>
      <InteractiveGallery images={images}/>
    </div>
  );
}

export default ArtGallery;