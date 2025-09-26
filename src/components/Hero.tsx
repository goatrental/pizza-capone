import React from "react";

export const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Background with animated rays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-amber-900/20 to-zinc-800"></div>

        {/* Animated light rays */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-full bg-gradient-to-b from-transparent via-yellow-400/10 to-transparent transform rotate-12 animate-pulse`}
              style={{
                left: `${10 + i * 8}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
                transform: `rotate(${15 + i * 5}deg)`,
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Hero Text */}
        <div className="text-center lg:text-left animate-slideInLeft">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-yellow-400 leading-tight mb-8 drop-shadow-2xl">
            Jestli nejsme nejlepší pizza ve Varech...
          </h1>

          <h2 className="font-serif text-2xl md:text-3xl text-yellow-400 italic mb-6 relative">
            <span className="relative">
              budeme si muset promluvit
              <span className="absolute -left-4 -top-2 text-3xl text-yellow-400/60">
                "
              </span>
              <span className="absolute -right-4 -bottom-2 text-3xl text-yellow-400/60">
                "
              </span>
            </span>
          </h2>

          <p className="text-lg text-amber-200 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 bg-amber-900/10 p-4 rounded-lg bborder-l-4 border-yellow-400">
            Autentická italská kuchyně od roku 1999. Lahodné pokrmy z čerstvých
            surovin, které nemůžete odmítnout.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => scrollToSection("order")}
              className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-zinc-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl transform"
            >
              Objednat nyní
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="border-2 border-yellow-400 text-amber-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-yellow-400 hover:text-zinc-900"
            >
              Prohlédnout menu
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center lg:justify-end animate-slideInRight">
          <div className="relative">
            <div className="w-80 h-80 md:w-96 md:h-96 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full animate-spin-slow opacity-20"></div>
              <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl animate-float">
                <img
                  src="2pizza-cappone-placeholder-500x500.jpg"
                  alt="Pizza Capone"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-zinc-900/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
