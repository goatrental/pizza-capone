import React from 'react';
import { Pizza } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-zinc-900 to-amber-900 flex items-center justify-center z-50 animate-fadeOut">
      <div className="text-center text-cream">
        <div className="flex items-center justify-center mb-4">
          <h1 className="font-serif text-5xl font-black text-yellow-400 tracking-wider drop-shadow-lg">
            Pizza Capone
          </h1>
        </div>
        <div className="w-12 h-12 border-4 border-amber-700 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-amber-200">Připravujeme nejlepší nabídku...</p>
      </div>
    </div>
  );
};