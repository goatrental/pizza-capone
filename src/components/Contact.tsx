import React from 'react';
import { MapPin, Phone, Mail, Clock, Truck, CreditCard } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-amber-900/20 to-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-yellow-400 mb-4 drop-shadow-lg">
            Kde nás najdete
          </h2>
          <p className="text-xl text-amber-200 italic">
            Naše dveře jsou vždy otevřené pro rodinu
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-zinc-800/50 backdrop-blur-sm border border-amber-800/30 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif text-xl font-semibold text-yellow-400 mb-2">Adresa</h4>
                  <p className="text-amber-200 leading-relaxed">
                    Sokolovská 525/101<br />
                    360 05 Karlovy Vary
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm border border-amber-800/30 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif text-xl font-semibold text-yellow-400 mb-2">Telefon</h4>
                  <div className="space-y-1">
                    <p>
                      <a 
                        href="tel:+420353569665" 
                        className="text-amber-200 hover:text-yellow-400 transition-colors"
                      >
                        +420 353 569 665
                      </a>
                    </p>
                    <p>
                      <a 
                        href="tel:+420606100729" 
                        className="text-amber-200 hover:text-yellow-400 transition-colors"
                      >
                        +420 606 100 729
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm border border-amber-800/30 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif text-xl font-semibold text-yellow-400 mb-2">Email</h4>
                  <p>
                    <a 
                      href="mailto:sef@cappone.cz"
                      className="text-amber-200 hover:text-yellow-400 transition-colors"
                    >
                      sef@cappone.cz
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm border border-amber-800/30 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif text-xl font-semibold text-yellow-400 mb-2">Otevírací doba</h4>
                  <div className="space-y-1 text-amber-200">
                    <p>Každý den: 11:00 - 24:00</p>
                    <p className="font-semibold text-yellow-400">Rozvoz funguje až do půlnoci</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm border border-amber-800/30 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <Truck className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif text-xl font-semibold text-yellow-400 mb-2">Rozvoz</h4>
                  <div className="space-y-2 text-amber-200">
                    <p>Cena rozvozu po Karlových Varech: <span className="font-semibold text-yellow-400">39 Kč</span></p>
                    <p>V okolí Karlových Varů: cena smluvní</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm border border-amber-800/30 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <CreditCard className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif text-xl font-semibold text-yellow-400 mb-2">Platby</h4>
                  <p className="text-amber-200">Přijímáme pouze platby v hotovosti či stravenkami</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="flex justify-center items-center">
            <div className="bg-amber-200 rounded-xl shadow-2xl overflow-hidden relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300">
                {/* Decorative map pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-4 border-2 border-amber-600 rounded-lg"></div>
                  <div className="absolute top-8 left-8 right-8 bottom-8 border border-amber-500 rounded-lg"></div>
                  {/* Grid pattern */}
                  {[...Array(6)].map((_, i) => (
                    <div key={`v-${i}`} className={`absolute top-4 bottom-4 w-px bg-amber-500 left-${4 + i * 4}`} />
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <div key={`h-${i}`} className={`absolute left-4 right-4 h-px bg-amber-500 top-${4 + i * 4}`} />
                  ))}
                </div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-zinc-900/80 backdrop-blur-sm">
                  <div className="bg-zinc-800/90 backdrop-blur-sm border border-amber-600/50 rounded-xl p-6">
                    <h4 className="font-serif text-2xl font-bold text-yellow-400 mb-2">
                      Naše teritorium
                    </h4>
                    <p className="text-amber-200 text-lg mb-4">Karlovy Vary a okolí</p>
                    <div className="text-amber-300 text-sm space-y-1">
                      <p className="font-medium">Cappone s.r.o.</p>
                      <p>IČ: 29082480</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};