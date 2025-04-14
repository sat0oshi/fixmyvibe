
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-br from-fixmyvibe-500 to-fixmyvibe-accent-500 bg-clip-text text-transparent">
            Connectez développeurs et créateurs no-code 
          </h1>
          <p className="text-xl mb-12 text-gray-300 max-w-3xl">
            FixMyVibe réunit des développeurs no-code en difficulté avec des développeurs expérimentés qui souhaitent venir en aide. From Vibecode to Real Code ! Fix it. Ship it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/auth?tab=register">
              <Button size="lg" className="bg-fixmyvibe-accent-500 hover:bg-fixmyvibe-accent-600 text-white px-8">
                Poster un projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth?tab=register">
              <Button size="lg" className="bg-fixmyvibe-600 hover:bg-fixmyvibe-700 text-white px-8">
                Devenir Helper
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
