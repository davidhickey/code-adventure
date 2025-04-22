import SpiralGalaxy from "../sections/SpiralGalaxy";


const HomePage = async ({children}:{children?: React.ReactNode}) => {
  return (
    <div>
      <div className="h-screen w-full overflow-hidden absolute top-0 left-0 hidden dark:block bg-lSecCream dark:bg-dSecDarkBlue transition-all duration-300 ease-in-out">
        <SpiralGalaxy />
      </div>
      <div className="absolute h-screen top-0 left-0 right-0 py-40 flex items-center dark:items-start justify-self-center sm:py-60">
        <h1 className="text-center text-5xl sm:text-8xl text-lPrimaryGreen dark:text-dPrimaryGray">{`Welcome :)`}</h1>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}

export default HomePage;
