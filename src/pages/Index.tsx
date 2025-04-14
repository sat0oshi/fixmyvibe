
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InfiniteGrid from "@/components/InfiniteGrid";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import UserTypes from "@/components/home/UserTypes";
import CTA from "@/components/home/CTA";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      {/* Background Grid Animation */}
      <InfiniteGrid />
      
      {/* Header */}
      <Navbar />
      
      {/* Main Content */}
      <Hero />
      <Stats />
      <UserTypes />
      <FAQ />
      <CTA />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
