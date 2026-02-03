import React, { useEffect, useState } from 'react';
import { fetchMarketTrends } from '../services/geminiService';
import { MarketTrend } from '../types';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Globe, TrendingUp, Clock } from 'lucide-react';

const MarketInsights: React.FC = () => {
  const [trends, setTrends] = useState<MarketTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const loadTrends = async () => {
      const data = await fetchMarketTrends();
      setTrends(data);
      setLoading(false);
      
      const cachedTime = localStorage.getItem('aura_market_trends_timestamp');
      if (cachedTime) {
        setLastUpdated(new Date(parseInt(cachedTime)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } else {
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    };
    loadTrends();
  }, []);

  const icons = [Activity, Globe, TrendingUp];

  return (
    <section className="py-24 bg-brand-charcoal relative border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
             <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-brand-gold mb-4"
            >
              <Sparkles size={16} />
              <span className="text-sm font-bold uppercase tracking-widest">Live Intelligence</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-serif text-white"
            >
              AI Market Insights
            </motion.h2>
          </div>
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="text-right hidden md:flex flex-col items-end"
          >
             <p className="text-gray-400 text-sm">Real-time analysis powered by Gemini 2.5</p>
             {lastUpdated && (
                <div className="flex items-center gap-1 text-[10px] text-brand-gold/50 uppercase tracking-widest mt-1">
                  <Clock size={10} /> Sync: {lastUpdated}
                </div>
             )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
             // Loading Skeletons
             Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-48 bg-white/5 rounded-lg animate-pulse border border-white/5" />
             ))
          ) : (
            trends.map((trend, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                  className="bg-brand-dark/50 border border-white/10 p-8 rounded-lg group hover:border-brand-gold/30 hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3 group-hover:text-brand-gold transition-colors">
                    {trend.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {trend.description}
                  </p>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;
