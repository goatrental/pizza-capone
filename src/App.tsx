import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Order } from './components/Order';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { useLoading } from './hooks/useLoading';

function App() {
  const { isLoading } = useLoading();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-yellow-900 to-zinc-800">
      {isLoading && <LoadingScreen />}
      <Header />
      <Hero />
      <Menu />
      <About />
      <Contact />
      <Order />
      <Footer />
    </div>
  );
}

export default App;