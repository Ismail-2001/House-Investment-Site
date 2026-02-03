import React, { useState } from 'react';
import { PROPERTIES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, DollarSign, BrainCircuit, X, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { analyzeAsset } from '../services/geminiService';
import { Property, AssetAnalysis } from '../types';

const Portfolio: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [analysis, setAnalysis] = useState<AssetAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDeepDive = async (e: React.MouseEvent, property: Property) => {
    e.stopPropagation();
    setSelectedProperty(property);
    setIsAnalyzing(true);
    try {
      const result = await analyzeAsset(property);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setAnalysis(null);
  };

  return (
    <section id="portfolio" className="py-24 bg-brand-charcoal relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-white mb-4"
          >
            Curated Assets
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-brand-gold mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROPERTIES.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer shadow-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.2s] ease-out will-change-transform"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {property.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-brand-gold text-brand-dark px-2 py-1 rounded-sm shadow-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleDeepDive(e, property)}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-4 py-2 border border-white/20 hover:border-brand-gold flex items-center gap-2"
                    >
                        <BrainCircuit size={14} /> AI Analysis
                    </motion.button>
                  </div>

                  <h3 className="text-2xl font-serif text-white mb-1 group-hover:text-brand-gold transition-colors duration-300">
                    {property.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-300 text-sm mb-6 group-hover:text-white transition-colors duration-300">
                    <MapPin size={14} className="mr-1 text-brand-gold" /> {property.location}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4 group-hover:border-brand-gold/30 transition-colors duration-300">
                    <div>
                        <div className="flex items-center text-brand-gold mb-1">
                            <TrendingUp size={16} className="mr-1"/>
                            <span className="font-bold text-lg">{property.roi}%</span>
                        </div>
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Proj. ROI</span>
                    </div>
                    <div>
                        <div className="flex items-center text-white mb-1">
                            <DollarSign size={16} className="mr-1"/>
                            <span className="font-bold text-lg">{property.value}</span>
                        </div>
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Asset Value</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Analysis Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-brand-dark/90 backdrop-blur-lg" 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-brand-charcoal border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex-none p-6 md:p-10 border-b border-white/5 bg-brand-dark/50 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold border border-brand-gold/20">
                        <BrainCircuit size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-serif text-white tracking-tight">Intelligence Report</h2>
                        <p className="text-sm text-gray-400 font-sans tracking-wide">Dynamic Analysis: {selectedProperty.name}</p>
                    </div>
                </div>
                <button onClick={closeModal} className="text-gray-500 hover:text-white transition-colors p-2">
                    <X size={28} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-6">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="text-brand-gold"
                    >
                        <BrainCircuit size={64} />
                    </motion.div>
                    <div className="text-center">
                        <p className="text-xl font-serif text-white mb-2">Engaging Gemini Pro Intelligence...</p>
                        <p className="text-gray-500 text-sm tracking-widest uppercase">Benchmarking asset against global luxury indices</p>
                    </div>
                  </div>
                ) : analysis && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-2 text-brand-gold mb-3 uppercase tracking-widest text-xs font-bold">
                                <CheckCircle2 size={16} /> Market Moat
                            </div>
                            <p className="text-gray-300 leading-relaxed font-serif text-lg italic">
                                "{analysis.marketMoat}"
                            </p>
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-2 text-brand-gold mb-4 uppercase tracking-widest text-xs font-bold">
                                <TrendingUp size={16} /> Key Yield Drivers
                            </div>
                            <ul className="space-y-4">
                                {analysis.revenueDrivers.map((driver, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-gold flex-none" />
                                        {driver}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                            <div className="flex items-center gap-2 text-brand-gold mb-3 uppercase tracking-widest text-xs font-bold">
                                <AlertCircle size={16} /> Institutional Safeguards
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {analysis.riskMitigation}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 text-brand-gold mb-3 uppercase tracking-widest text-xs font-bold">
                                <ArrowUpRight size={16} /> Strategic Exit
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {analysis.exitStrategy}
                            </p>
                        </div>

                        <div className="pt-6">
                            <button className="w-full bg-brand-gold text-brand-dark py-4 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-lg shadow-brand-gold/10">
                                Download Full Prospectus
                            </button>
                        </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;