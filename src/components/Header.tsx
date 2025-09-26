import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      isScrolled ? 'bg-zinc-900/98 shadow-xl' : 'bg-zinc-900/95'
    } backdrop-blur-md`}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => scrollToSection('home')}>
            <h1 className="font-mafia text-2xl font-black text-yellow-400 tracking-wider drop-shadow-lg">
              Pizza Capone
            </h1>
            <span className="text-xs text-amber-300 italic block -mt-1">Est. 1999</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {[
              { name: 'Domů', id: 'home' },
              { name: 'Menu', id: 'menu' },
              { name: 'O nás', id: 'about' },
              { name: 'Kontakt', id: 'contact' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-amber-100 hover:text-yellow-400 transition-colors duration-300 font-medium relative group py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollToSection('order')}
                className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-zinc-900 px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Objednávka
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-amber-100 hover:text-yellow-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-zinc-900/98 backdrop-blur-md border-t border-amber-800/30">
            <ul className="flex flex-col py-4">
              {[
                { name: 'Domů', id: 'home' },
                { name: 'Menu', id: 'menu' },
                { name: 'O nás', id: 'about' },
                { name: 'Kontakt', id: 'contact' },
                { name: 'Objednávka', id: 'order' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-8 py-3 text-amber-100 hover:text-yellow-400 hover:bg-amber-900/20 transition-all duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
