import SpiralGalaxy from "../sections/SpiralGalaxy";

const HomePage = async ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <div className="h-[100dvh] w-full overflow-hidden absolute top-0 left-0 hidden dark:block bg-lSecCream dark:bg-dSecDarkBlue opacity-50 transition-all duration-300 ease-in-out">
        <SpiralGalaxy />
      </div>
      <div className="px-7 absolute max-w-[1025px] h-full top-0 left-0 right-0 py-4 gap-4 flex flex-col items-center justify-center dark:items-center justify-self-center sm:py-20">
        <h1 className="text-left w-full font-black leading-[1] text-5xl sm:text-8xl text-lPrimaryGreen dark:text-dPrimaryGray">
          {`I'm David, a frontend engineer based in New York City.`}
        </h1>
        <h2 className="text-left w-full font-semibold leading-tight text-xl sm:text-3xl text-lPrimaryGreen dark:text-dPrimaryGray">
          {`I love creating beautiful and functional web experiences.`}
        </h2>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default HomePage;
