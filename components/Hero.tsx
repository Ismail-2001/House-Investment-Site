import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Hotel"
          className="w-full h-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/50 to-brand-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            variants={itemVariants}
            className="block text-brand-gold uppercase tracking-[0.3em] text-sm mb-4"
          >
            Redefining Hospitality Investment
          </motion.span>
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight"
          >
            Invest in the <br />
            <span className="italic">Extraordinary</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 font-light leading-relaxed"
          >
            Aura curates a portfolio of world-class hotel assets, delivering superior returns through operational excellence and strategic acquisition.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#portfolio"
              onClick={(e) => handleScrollTo(e as any, '#portfolio')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-brand-gold text-brand-dark font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 w-full md:w-auto shadow-lg shadow-brand-gold/20"
            >
              View Portfolio
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => handleScrollTo(e as any, '#contact')}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest hover:border-white transition-all duration-300 w-full md:w-auto"
            >
              Request Access
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;