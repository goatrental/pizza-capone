import React from 'react';
import { Heart, Award, Clock } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-zinc-900 to-amber-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Story Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-yellow-400 mb-6 drop-shadow-lg">
                Naše rodinná historie
              </h2>
            </div>
            
            <div className="space-y-6 text-amber-200 text-lg leading-relaxed">
              <p className="bg-amber-900/10 p-6 rounded-xl border-l-4 border-yellow-400">
                Pizza Cappone vznikla v roce 1999 s jediným cílem - přinést
                autentickou chuť Itálie do srdce České republiky. Naše hlavní
                činností je výroba lahodných italských pokrmů, mezi které patří
                hlavně pizza, špagety, noky, tortelliny, saláty, lasagne a
                italské speciality.
              </p>

              <p className="bg-amber-900/10 p-6 rounded-xl border-l-4 border-yellow-400">
                Každé jídlo je vyrobeno z každodenně kupovaných čerstvých
                surovin a je mu věnována péče skutečného odborníka. Stali jsme
                se první nekuřáckou pizzerií v Karlových Varech, abychom vám
                umožnili vychutnat si lahodnou italskou kuchyni bez nepříjemného
                kouřového zápachu.
              </p>

              <p className="bg-amber-900/10 p-6 rounded-xl border-l-4 border-yellow-400">
                Naše pizzeria vás příjemně překvapí svojí rodinnou atmosférou,
                příjemnou obsluhou a bohatým výběrem italských pokrmů. V naší
                nabídce naleznete více než devadesát druhů různých pokrmů. Vámi
                vybrané jídlo buď dovezeme nebo si ho můžete vychutnat v naší
                útulné pizzerii.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-zinc-800/50 backdrop-blur-sm border border-amber-800/30 rounded-xl">
                <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="font-serif text-xl font-semibold text-yellow-400 mb-2">Rodina</h4>
                <p className="text-amber-200">Tradice předávané z generace na generaci</p>
              </div>
              
              <div className="text-center p-6 bg-zinc-800/50 backdrop-blur-sm border border-amber-800/30 rounded-xl">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="font-serif text-xl font-semibold text-yellow-400 mb-2">Kvalita</h4>
                <p className="text-amber-200">Pouze nejlepší ingredience z Itálie</p>
              </div>
              
              <div className="text-center p-6 bg-zinc-800/50 backdrop-blur-sm border border-amber-800/30 rounded-xl">
                <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="font-serif text-xl font-semibold text-yellow-400 mb-2">Tradice</h4>
                <p className="text-amber-200">Autentické recepty od roku 1999</p>
              </div>
            </div>
          </div>

          {/* Vintage Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="bg-amber-700 p-4 rounded-xl shadow-2xl">
                <div className="bg-amber-100 p-4 rounded-lg">
                  <div className="aspect-square bg-amber-900/20 rounded-lg overflow-hidden">
                    <img
                      src="2pizza-cappone-placeholder-500x500.jpg"
                      alt="Pizza Cappone 1999"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center text-zinc-800 font-serif italic mt-2">
                    Pizza Cappone, 1999
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};