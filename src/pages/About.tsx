
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              À propos de FixMyVibe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                FixMyVibe est né d'une vision simple : créer un pont entre les développeurs no-code qui rencontrent des difficultés 
                et des développeurs expérimentés prêts à les aider gratuitement.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
                Notre plateforme permet aux créateurs no-code de soumettre leurs projets et leurs défis, 
                et d'être mis en relation avec des développeurs bienveillants qui les accompagneront dans la résolution de leurs problèmes.
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
                C'est un espace d'entraide et de partage, où la communauté tech se mobilise pour soutenir 
                l'innovation et la création, quel que soit le niveau technique.
              </p>

              <div className="mt-12 border-t pt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  À propos du créateur
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Je suis Karim sat0oshi, le créateur de FixMyVibe. Passionné par l'innovation et 
                  la démocratisation du développement, j'ai créé cette plateforme pour faciliter 
                  l'entraide dans la communauté tech.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Me contacter
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => window.open('https://linktr.ee/sat0oshi', '_blank')}
                  >
                    <span>Tous mes liens</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => window.open('https://instagram.com/sat0oshi', '_blank')}
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Instagram</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => window.open('https://twitter.com/sat0oshi', '_blank')}
                  >
                    <Twitter className="h-4 w-4" />
                    <span>Twitter</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => window.open('https://linkedin.com/in/sat0oshi', '_blank')}
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
