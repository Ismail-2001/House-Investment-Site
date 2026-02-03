import React from 'react';
import { TESTIMONIALS } from '../constants';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark border-t border-white/10 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
           <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-4 block"
          >
            Trust & Credibility
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-serif text-white mb-6"
          >
            Partner Perspectives
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-white/10 mx-auto"
          />
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              className="bg-brand-charcoal/50 border border-white/5 p-8 rounded-lg relative hover:bg-white/5 transition-colors duration-300"
            >
              <Quote className="text-brand-gold opacity-30 mb-6" size={40} />
              <p className="text-gray-300 italic leading-relaxed mb-6 font-serif">
                "{testimonial.quote}"
              </p>
              <div>
                <h4 className="text-white font-bold text-lg">{testimonial.author}</h4>
                <p className="text-brand-gold text-xs uppercase tracking-wider mt-1">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;