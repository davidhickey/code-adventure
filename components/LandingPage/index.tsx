import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LandingPage = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="landing-page-wrapper bg-lSecCream dark:bg-dSecDarkBlue transition-all duration-300 ease-in-out">
      <Header />
      <div className="landing-page-main min-h-screen px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;