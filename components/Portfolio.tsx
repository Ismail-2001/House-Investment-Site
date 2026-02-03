import React from 'react';
import { PROPERTIES } from '../constants';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, DollarSign } from 'lucide-react';

const Portfolio: React.FC = () => {
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
              {/* Image with Parallax Zoom Effect */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.2s] ease-out will-change-transform"
                />
              </div>

              {/* Base Gradient - Always visible for basic readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

              {/* Hover Gradient Overlay - Transitions in for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  
                  {/* Tags - Fade in and slide up on hover */}
                  <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {property.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold uppercase tracking-wider bg-brand-gold text-brand-dark px-2 py-1 rounded-sm shadow-md">
                        {tag}
                      </span>
                    ))}
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
    </section>
  );
};

export default Portfolio;