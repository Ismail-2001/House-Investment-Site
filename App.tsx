import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import MarketInsights from './components/MarketInsights';
import Portfolio from './components/Portfolio';
import AIAdvisor from './components/AIAdvisor';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-cream font-sans antialiased selection:bg-brand-gold selection:text-brand-dark">
      <Navigation onLoginClick={() => setIsLoginOpen(true)} />
      
      <main>
        <Hero />
        
        {/* Philosophy Section */}
        <section id="philosophy" className="py-24 bg-brand-charcoal text-center">
            <div className="container mx-auto px-6 max-w-4xl">
                <span className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-4 block">Our Philosophy</span>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-8 leading-snug">
                    "We believe that true luxury is timeless, and that intelligent investment requires seeing value where others see only expense."
                </h2>
                <div className="w-16 h-1 bg-white/10 mx-auto" />
            </div>
        </section>

        <StatsSection />
        <MarketInsights />
        <Portfolio />
        
        {/* Call to Action */}
        <section className="py-32 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" alt="Luxury Interior" className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
            </div>
            <div className="relative z-10 text-center max-w-3xl px-6">
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Partner with Excellence</h2>
                <p className="text-gray-300 mb-10 text-lg">
                    Join a select group of investors who are shaping the future of global hospitality.
                </p>
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-brand-gold text-brand-dark px-10 py-4 text-base font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-brand-gold/10"
                >
                    Become an Investor
                </button>
            </div>
        </section>

        <Testimonials />
      </main>

      <Footer onLoginClick={() => setIsLoginOpen(true)} />
      <AIAdvisor />
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}

export default App;