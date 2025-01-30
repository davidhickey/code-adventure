import Image from "next/image";
import Link from "next/link";
import Button from "@/components/elements/Button";
import { fetchApodData } from "@/lib/apis/nasa";
const NasaPOD = async () => {
  const apodData = await fetchApodData();
  if (!apodData) {
    console.error("Failed to fetch APOD data and render it.");
    return null;
  }
  return (
    <div className="mx-auto max-w-2xl pb-8">
      <div className="text-center">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-lPrimaryGreen dark:text-dPrimaryGray">
          NASA Astronomy Picture of the Day
        </h1>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-4 relative">
          <Image
            alt=""
            src={apodData.url}
            className="rounded-lg w-full h-full !relative flex flex-row"
            fill={true}
          />
          <div className="image-description flex flex-row flex-wrap justify-center gap-4 text-lPrimaryGreen dark:text-dPrimaryGray">
            <h2 className="text-2xl font-semibold">{apodData.title}</h2>
            <p className="text-lg">{apodData.explanation}</p>
            <div className="btn-container">
              <Button variant="secondary">
                <Link href="/space-gallery">
                  Check Out More NASA Images
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NasaPOD;