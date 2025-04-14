
import { Link } from "react-router-dom";
import { Github, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-fixmyvibe-500 font-bold text-xl">FixMyVibe</span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              FixMyVibe connecte gratuitement les Vibecoders en difficulté avec des développeurs 
              expérimentés pour les aider à résoudre leurs problèmes. 
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com/sat0oshi/fixmyvibe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-500 hover:text-fixmyvibe-500 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://x.com/sat0oshi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-500 hover:text-fixmyvibe-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-fixmyvibe-500 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-fixmyvibe-500 transition-colors">
                  Projets
                </Link>
              </li>
              <li>
                <Link to="/developers" className="text-gray-400 hover:text-fixmyvibe-500 transition-colors">
                  Développeurs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-fixmyvibe-500 transition-colors">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Légal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-fixmyvibe-500 transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-fixmyvibe-500 transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} FixMyVibe. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-sm flex items-center mt-4 md:mt-0">
            Fait avec <Heart size={16} className="mx-1 text-red-500" /> pour la communauté no-code
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
