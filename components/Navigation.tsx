import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled || mobileMenuOpen
          ? 'bg-brand-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
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
            className="bg-brand-gold text-brand-dark px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 flex items-center gap-2"
          >
            Investor Login <ArrowRight size={16} />
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
            <button className="w-full bg-brand-gold text-brand-dark px-6 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300">
              Investor Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;