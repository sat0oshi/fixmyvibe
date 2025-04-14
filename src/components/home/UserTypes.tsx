
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, Users, ArrowRight } from "lucide-react";

const UserTypes = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 p-8 rounded-lg hover:border-fixmyvibe-600/40 transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-fixmyvibe-600/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Code size={24} className="text-fixmyvibe-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Pour les Helpers</h2>
            <p className="text-gray-300 mb-6">
              Aidez la communauté et développez votre portfolio.
              Parcourez des projets passionnants, connectez-vous avec des clients et faites une différence.
            </p>
            <Link to="/auth?tab=register">
              <Button size="lg" className="w-full bg-fixmyvibe-600 hover:bg-fixmyvibe-700 text-white">
                Rejoindre en tant que DevHelper
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 p-8 rounded-lg hover:border-fixmyvibe-accent-500/40 transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-fixmyvibe-accent-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Users size={24} className="text-fixmyvibe-accent-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Pour les VibeCoders</h2>
            <p className="text-gray-300 mb-6">
              Trouvez rapidement l'aide dont vous avez besoin.
              Postez votre projet et trouvez le développeur parfait pour vous aider à le résoudre!
            </p>
            <Link to="/auth?tab=register">
              <Button size="lg" className="w-full bg-fixmyvibe-accent-500 hover:bg-fixmyvibe-accent-600 text-white">
                Poster un Projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTypes;
