
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-fixmyvibe-100 w-14 h-14 rounded-full flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-fixmyvibe-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vous avez des questions sur FixMyVibe ? Consultez nos réponses aux questions les plus courantes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Comment fonctionne FixMyVibe ?
              </AccordionTrigger>
              <AccordionContent>
                FixMyVibe est une plateforme qui connecte gratuitement des développeurs no-code 
                en difficulté avec des développeurs expérimentés qui souhaitent aider. Les créateurs 
                soumettent leurs projets, et les développeurs volontaires les aident à résoudre leurs problèmes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Combien coûte l'utilisation de FixMyVibe ?
              </AccordionTrigger>
              <AccordionContent>
                FixMyVibe est 100% gratuit ! Nous croyons fermement que l'entraide dans la 
                communauté no-code devrait être accessible à tous, sans frais cachés ni abonnements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                Comment puis-je m'inscrire en tant que développeur ?
              </AccordionTrigger>
              <AccordionContent>
                Cliquez sur "Join as DevHelper" ou sur le bouton "S'inscrire" dans la 
                navigation, puis sélectionnez le rôle "Développeur" lors de l'inscription. 
                Complétez votre profil avec vos compétences pour que les créateurs puissent vous trouver.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                Comment soumettre un projet qui a besoin d'aide ?
              </AccordionTrigger>
              <AccordionContent>
                Inscrivez-vous en tant que "VibeCoder", cliquez sur "Poster un projet", 
                puis remplissez le formulaire avec les détails de votre projet et le problème 
                que vous rencontrez. Ajoutez un lien privé vers votre projet pour que les développeurs puissent y accéder.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                Combien de temps faut-il pour recevoir de l'aide ?
              </AccordionTrigger>
              <AccordionContent>
                Le temps de réponse varie en fonction de la complexité de votre projet et de 
                la disponibilité des développeurs. En moyenne, les projets reçoivent une première 
                réponse dans les 15 minutes à 24 heures suivant leur publication.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
