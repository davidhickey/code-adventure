import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LandingPage = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default LandingPage;