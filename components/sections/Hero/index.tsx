import { ApodData } from "@/lib/apis/nasa";
import { Button } from "@headlessui/react";
import Image from 'next/image';
import Link from "next/link";

const HeroSection = ({
  apodData,
}:{
  apodData: ApodData
}) => {

  return (
    <div className="hero-section-container bg-white">
      <div className="relative isolate px-6 lg:pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl pb-8">
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              NASA Astronomy Picture of the Day
            </h1>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-4 relative">
              <Image
                alt=""
                src={apodData.url}
                className="rounded-lg w-full h-full !relative flex flex-row"
                fill={true}
              />
              <div className="image-description flex flex-row flex-wrap justify-center gap-4">
                <h2 className="text-2xl font-semibold">{apodData.title}</h2>
                <p className="text-lg">{apodData.explanation}</p>
                <div className="btn-container">
                  <Button className="rounded font-bold bg-primaryPurple py-2 px-4 text-sm text-white data-[hover]:opacity-50" type="button">
                    <Link href="/space-gallery">
                      Check Out More NASA Images
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection;