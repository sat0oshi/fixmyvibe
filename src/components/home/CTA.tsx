
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-fixmyvibe-600 to-fixmyvibe-accent-500 rounded-xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à rejoindre notre communauté ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Que vous soyez développeur ou créateur no-code, FixMyVibe est là pour vous connecter et vous aider.
          </p>
          <Link to="/auth?tab=register">
            <Button size="lg" className="bg-white text-fixmyvibe-600 hover:bg-gray-100">
              S'inscrire maintenant 
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
