
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, HelpCircle, Code, Users, Check, Clock, FileCheck } from "lucide-react";
import FAQ from "@/components/FAQ";
import InfiniteGrid from "@/components/InfiniteGrid";

const Index = () => {
  return <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      {/* Background Grid Animation */}
      <InfiniteGrid />
      
      {/* Header */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-br from-fixmyvibe-500 to-fixmyvibe-accent-500 bg-clip-text text-transparent">Créer sans limites. Avancer ensemble ! </h1>
            <p className="text-xl mb-12 text-gray-300 max-w-3xl">FixMyVibe réunit des développeurs no-code en difficulté avec des développeurs expérimentés qui souhaitent venir en aide.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register?role=no-code">
                <Button size="lg" className="bg-fixmyvibe-accent-500 hover:bg-fixmyvibe-accent-600 text-white px-8">
                  Poster un projet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register?role=developer">
                <Button size="lg" className="bg-fixmyvibe-600 hover:bg-fixmyvibe-700 text-white px-8">
                  Devenir Helper
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Stats Section */}
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

      {/* User Type Selection Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Developers */}
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 p-8 rounded-lg hover:border-fixmyvibe-600/40 transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-fixmyvibe-600/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Code size={24} className="text-fixmyvibe-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">Pour les Helpers</h2>
              <p className="text-gray-300 mb-6">
                Aidez la communauté et développez votre portfolio.
                Parcourez des projets passionnants, connectez-vous avec des clients et faites une différence.
              </p>
              <Link to="/register?role=developer">
                <Button size="lg" className="w-full bg-fixmyvibe-600 hover:bg-fixmyvibe-700 text-white">
                  Rejoindre en tant que DevHelper
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* For VibeCoders */}
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 p-8 rounded-lg hover:border-fixmyvibe-accent-500/40 transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-fixmyvibe-accent-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users size={24} className="text-fixmyvibe-accent-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">Pour les VibeCoders</h2>
              <p className="text-gray-300 mb-6">
                Trouvez rapidement l'aide dont vous avez besoin.
                Postez votre projet et trouvez le développeur parfait pour vous aider à le résoudre!
              </p>
              <Link to="/register?role=no-code">
                <Button size="lg" className="w-full bg-fixmyvibe-accent-500 hover:bg-fixmyvibe-accent-600 text-white">
                  Poster un Projet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with dark theme styling */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-fixmyvibe-600/20 w-14 h-14 rounded-full flex items-center justify-center">
                <HelpCircle className="h-8 w-8 text-fixmyvibe-500" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Questions fréquentes</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Vous avez des questions sur FixMyVibe ? Consultez nos réponses aux questions les plus courantes.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer">
                    <h3 className="text-lg font-medium text-white">Comment fonctionne FixMyVibe ?</h3>
                    <span className="transition group-open:rotate-180">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-300 border-t border-gray-800">
                    FixMyVibe est une plateforme qui connecte gratuitement des développeurs no-code 
                    en difficulté avec des développeurs expérimentés qui souhaitent aider. Les créateurs 
                    soumettent leurs projets, et les développeurs volontaires les aident à résoudre leurs problèmes.
                  </div>
                </details>
              </div>

              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer">
                    <h3 className="text-lg font-medium text-white">Combien coûte l'utilisation de FixMyVibe ?</h3>
                    <span className="transition group-open:rotate-180">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-300 border-t border-gray-800">
                    FixMyVibe est 100% gratuit ! Nous croyons fermement que l'entraide dans la 
                    communauté no-code devrait être accessible à tous, sans frais cachés ni abonnements.
                  </div>
                </details>
              </div>

              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer">
                    <h3 className="text-lg font-medium text-white">Comment puis-je m'inscrire en tant que développeur ?</h3>
                    <span className="transition group-open:rotate-180">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-300 border-t border-gray-800">
                    Cliquez sur "Devenir Helper" ou sur le bouton "S'inscrire" dans la 
                    navigation, puis sélectionnez le rôle "Développeur" lors de l'inscription. 
                    Complétez votre profil avec vos compétences pour que les créateurs puissent vous trouver.
                  </div>
                </details>
              </div>

              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer">
                    <h3 className="text-lg font-medium text-white">Comment soumettre un projet qui a besoin d'aide ?</h3>
                    <span className="transition group-open:rotate-180">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-300 border-t border-gray-800">
                    Inscrivez-vous en tant que "VibeCoder", cliquez sur "Poster un projet", 
                    puis remplissez le formulaire avec les détails de votre projet et le problème 
                    que vous rencontrez. Ajoutez un lien privé vers votre projet pour que les développeurs puissent y accéder.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-fixmyvibe-600 to-fixmyvibe-accent-500 rounded-xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à rejoindre notre communauté ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Que vous soyez développeur ou créateur no-code, FixMyVibe est là pour vous connecter et vous aider.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-fixmyvibe-600 hover:bg-gray-100">
                S'inscrire maintenant 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer with dark theme */}
      <Footer />
    </div>;
};

export default Index;
