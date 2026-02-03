import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, TrendingUp } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  onLoginClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sentiment, setSentiment] = useState("Analyzing global luxury hospitality sentiment...");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Simulate a dynamic sentiment update
    const timer = setTimeout(() => {
        setSentiment("Market Sentiment: HIGH (Bullish on Boutique Coastal Assets)");
    }, 3000);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timer);
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Ticker Bar */}
      <div className="bg-brand-gold/10 border-b border-brand-gold/20 py-1.5 backdrop-blur-sm hidden md:block overflow-hidden">
        <div className="container mx-auto px-6">
            <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: '-100%' }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="flex items-center gap-4 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold"
            >
                <TrendingUp size={10} /> {sentiment} — Q3 2025 Yield Projections: +14.2% — Tokyo Prime Urban RevPAR hitting record highs — New Amalfi inventory secured — 
            </motion.div>
        </div>
      </div>

      <nav
        className={`transition-all duration-500 ${
          isScrolled || mobileMenuOpen
            ? 'bg-brand-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-brand-gold rounded-sm transform rotate-45 flex items-center justify-center">
                <div className="w-4 h-4 bg-brand-dark transform" />
            </div>
            <span className="text-2xl font-serif font-bold text-white tracking-wide">
                AURA
            </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
                <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm uppercase tracking-widest text-gray-300 hover:text-brand-gold transition-colors duration-300 relative group"
                >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                </a>
            ))}
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLoginClick}
                className="bg-brand-gold text-brand-dark px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 flex items-center gap-2"
            >
                Investor Portal <ArrowRight size={16} />
            </motion.button>
            </div>

            {/* Mobile Toggle */}
            <button
            className="md:hidden text-white hover:text-brand-gold transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
            {mobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden absolute top-full left-0 w-full bg-brand-dark border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl overflow-hidden backdrop-blur-xl bg-brand-dark/95"
            >
                {NAV_LINKS.map((link) => (
                <a
                    key={link.label}
                    href={link.href}
                    className="text-lg font-serif text-white hover:text-brand-gold transition-colors"
                    onClick={(e) => handleScrollTo(e, link.href)}
                >
                    {link.label}
                </a>
                ))}
                <button 
                  onClick={onLoginClick}
                  className="w-full bg-brand-gold text-brand-dark px-6 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300"
                >
                Investor Login
                </button>
            </motion.div>
            )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navigation;