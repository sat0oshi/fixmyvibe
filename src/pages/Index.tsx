
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, HelpCircle, Code, Users } from "lucide-react";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
              Connectez développeurs et créateurs no-code pour des solutions gratuites
            </h1>
            <p className="text-xl mb-12 text-white/90 max-w-3xl">
              FixMyVibe réunit des développeurs no-code en difficulté avec des développeurs
              expérimentés qui souhaitent aider bénévolement.
            </p>
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

      {/* User Type Selection Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Developers */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-fixmyvibe-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Code size={24} className="text-fixmyvibe-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">For Developers</h2>
              <p className="text-gray-600 mb-6">
                Browse exciting projects, connect with clients, and grow your portfolio.
                Help creators solve their problems and make a difference.
              </p>
              <Link to="/register?role=developer">
                <Button size="lg" className="w-full bg-fixmyvibe-600 hover:bg-fixmyvibe-700">
                  Join as DevHelper
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* For VibeCoders */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-fixmyvibe-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users size={24} className="text-fixmyvibe-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">For VibeCoders</h2>
              <p className="text-gray-600 mb-6">
                Post your project and find the perfect dev to help you fix it! 
                Get assistance with your no-code project from experienced developers.
              </p>
              <Link to="/register?role=no-code">
                <Button size="lg" className="w-full bg-fixmyvibe-accent-500 hover:bg-fixmyvibe-accent-600">
                  Post a Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-fixmyvibe-600 mb-2">100%</h3>
              <p className="text-gray-600">Gratuit pour tous</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-fixmyvibe-600 mb-2">15 min</h3>
              <p className="text-gray-600">Temps de réponse moyen</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-fixmyvibe-600 mb-2">200+</h3>
              <p className="text-gray-600">Projets résolus</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-fixmyvibe-600 rounded-xl p-8 md:p-16 text-center">
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

      <Footer />
    </div>
  );
};

export default Index;
