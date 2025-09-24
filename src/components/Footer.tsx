import React, { useState } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      alert('Děkujeme za přihlášení k odběru novinek!');
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-zinc-900 border-t border-amber-800/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div 
              className="cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <h4 className="font-serif text-2xl font-bold text-yellow-400">Pizza Capone</h4>
              <p className="text-amber-200 text-sm">Autentická italská kuchyně od roku 1999</p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-amber-400 hover:text-yellow-400 transition-colors transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-amber-400 hover:text-yellow-400 transition-colors transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-amber-400 hover:text-yellow-400 transition-colors transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-yellow-400">Kontakt</h4>
            <div className="text-amber-200 space-y-1 text-sm">
              <p>Sokolovská 525/101, Karlovy Vary</p>
              <p>
                <a href="tel:+420353569665" className="hover:text-yellow-400 transition-colors">
                  Tel: +420 353 569 665
                </a>
              </p>
              <p>
                <a href="tel:+420606100729" className="hover:text-yellow-400 transition-colors">
                  Tel: +420 606 100 729
                </a>
              </p>
              <p>
                <a href="mailto:sef@cappone.cz" className="hover:text-yellow-400 transition-colors">
                  Email: sef@cappone.cz
                </a>
              </p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-yellow-400">Otevírací doba</h4>
            <div className="text-amber-200 space-y-1 text-sm">
              <p>Každý den: 11:00 - 24:00</p>
              <p>Rozvoz až do půlnoci</p>
              <p className="text-yellow-400 font-medium">Cena rozvozu: 39 Kč</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-yellow-400">Newsletter</h4>
            <p className="text-amber-200 text-sm">Přihlaste se k odběru novinek</p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Váš email"
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 bg-zinc-800 border border-amber-700/50 rounded-lg text-amber-100 placeholder-amber-400/60 focus:outline-none focus:border-yellow-400 transition-colors text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-zinc-900 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Přihlašuji...' : 'Přihlásit'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-amber-800/30">
          <div className="text-center text-amber-400/80 text-sm">
            <p>
              © 2025 Pizza Capone. Všechna práva vyhrazena. | Vytvořeno s láskou a respektem k tradici.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};