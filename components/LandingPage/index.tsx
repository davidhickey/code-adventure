import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LandingPage = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="landing-page-wrapper">
      <Header />
      <div className="landing-page-main min-h-screen px-6">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;