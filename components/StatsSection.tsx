import React, { useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PERFORMANCE_DATA } from '../constants';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = '', prefix = '', decimals = 0 }: { value: number, suffix?: string, prefix?: string, decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 50,
    duration: 2
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};

const StatsSection: React.FC = () => {
  return (
    <section id="insights" className="py-24 bg-brand-dark border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-serif text-white mb-6">Market Outperformance</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Our proprietary AI-driven analysis and hands-on management strategy consistently deliver returns that exceed industry benchmarks. We don't just follow trends; we set them.
              </p>
              
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-serif text-brand-gold mb-1">
                    <AnimatedCounter value={24.5} suffix="%" decimals={1} />
                  </div>
                  <div className="text-sm uppercase tracking-wider text-gray-500">Avg. Internal Rate of Return</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-brand-gold mb-1">
                    <AnimatedCounter value={2.4} prefix="$" suffix="B+" decimals={1} />
                  </div>
                  <div className="text-sm uppercase tracking-wider text-gray-500">Assets Under Management</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chart Container */}
          <div className="lg:w-2/3 w-full h-[450px] bg-white/5 rounded-lg p-8 border border-white/10 shadow-2xl flex flex-col">
            <h3 className="text-white text-lg font-serif mb-8 flex items-center gap-2 flex-none">
              <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
              Aura vs. Market Benchmark
            </h3>
            
            {/* Chart Wrapper - Isolates the chart space for stable ResponsiveContainer measurement */}
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    stroke="#94a3b8" 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `$${val}M`}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#F5F5F0' }}
                    itemStyle={{ color: '#D4AF37' }}
                    cursor={{ stroke: '#D4AF37', strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#D4AF37"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    name="Aura Revenue"
                    animationDuration={1500}
                  />
                  <Area
                    type="monotone"
                    dataKey="marketAverage"
                    stroke="#64748b"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="transparent"
                    name="Market