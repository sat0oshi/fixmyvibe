
import { Check, Clock, FileCheck } from "lucide-react";

const Stats = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-gray-900/40 backdrop-blur-sm border border-gray-800 text-center hover:border-fixmyvibe-600/40 transition-colors duration-300">
            <div className="w-16 h-16 mx-auto bg-fixmyvibe-600/20 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-fixmyvibe-500" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
            <p className="text-gray-400">Gratuit pour tous</p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-900/40 backdrop-blur-sm border border-gray-800 text-center hover:border-fixmyvibe-600/40 transition-colors duration-300">
            <div className="w-16 h-16 mx-auto bg-fixmyvibe-600/20 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-fixmyvibe-500" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">15 min</h3>
            <p className="text-gray-400">Temps de réponse moyen</p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-900/40 backdrop-blur-sm border border-gray-800 text-center hover:border-fixmyvibe-600/40 transition-colors duration-300">
            <div className="w-16 h-16 mx-auto bg-fixmyvibe-600/20 rounded-full flex items-center justify-center mb-4">
              <FileCheck className="h-8 w-8 text-fixmyvibe-500" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">0+</h3>
            <p className="text-gray-400">Projets résolus</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
