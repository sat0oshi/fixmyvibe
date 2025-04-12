
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Code, MessageSquare, Users, Check } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Résolvez vos problèmes de développement no-code gratuitement
              </h1>
              <p className="text-xl mb-8 text-white/90">
                FixMyVibe connecte des développeurs no-code en difficulté avec
                des développeurs expérimentés volontaires pour les aider.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-fixmyvibe-600 hover:bg-gray-100">
                    Demander de l'aide
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                    Devenir mentor
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4">Comment ça marche</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-fixmyvibe-100 p-2 rounded-full">
                      <Code size={20} className="text-fixmyvibe-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Soumettez votre projet</h4>
                      <p className="text-gray-600">Décrivez votre problème et partagez votre lien privé</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-fixmyvibe-100 p-2 rounded-full">
                      <Users size={20} className="text-fixmyvibe-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Soyez mis en relation</h4>
                      <p className="text-gray-600">Un développeur expérimenté vous contactera</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-fixmyvibe-100 p-2 rounded-full">
                      <MessageSquare size={20} className="text-fixmyvibe-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Collaborez</h4>
                      <p className="text-gray-600">Recevez de l'aide et des conseils personnalisés</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-fixmyvibe-100 p-2 rounded-full">
                      <Check size={20} className="text-fixmyvibe-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Problème résolu</h4>
                      <p className="text-gray-600">Terminez votre projet avec succès</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-full overflow-hidden h-16 -bottom-1">
          <svg 
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ fill: '#f9fafb' }}
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.48,214.86,136.19,214.86,136.19,271.82,66.84,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi utiliser FixMyVibe</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre plateforme est conçue pour offrir une expérience d'entraide simple et efficace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md card-hover">
              <div className="bg-fixmyvibe-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Code size={24} className="text-fixmyvibe-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">100% Gratuit</h3>
              <p className="text-gray-600">
                Nous croyons que l'entraide doit être accessible à tous. Aucun paiement, aucun abonnement.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md card-hover">
              <div className="bg-fixmyvibe-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users size={24} className="text-fixmyvibe-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Communauté de qualité</h3>
              <p className="text-gray-600">
                Des développeurs expérimentés volontaires prêts à partager leurs connaissances.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md card-hover">
              <div className="bg-fixmyvibe-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare size={24} className="text-fixmyvibe-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Aide personnalisée</h3>
              <p className="text-gray-600">
                Un accompagnement individuel adapté à votre projet spécifique et à vos besoins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-fixmyvibe-600 rounded-xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à débloquer votre projet no-code ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté et trouvez l'aide dont vous avez besoin pour faire avancer votre projet.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-fixmyvibe-600 hover:bg-gray-100">
                Commencer maintenant 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
