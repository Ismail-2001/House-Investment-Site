import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

const InvestorSection: React.FC = () => {
  const [view, setView] = useState<'login' | 'forgot' | 'success'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Credentials required for institutional verification.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email) && email.length < 5) {
      setError('Please provide a valid institutional ID or email.');
      return;
    }

    setIsSubmitting(true);
    // Simulated institutional auth delay
    setTimeout(() => {
      setIsSubmitting(false);
      setError('Identity verification failed. Please contact your dedicated account manager.');
    }, 2000);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Institutional email required for recovery.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setView('success');
    }, 1500);
  };

  return (
    <section id="portal" className="min-h-screen bg-brand-dark flex flex-col md:flex-row overflow-hidden">
      {/* Left: Cinematic Branding */}
      <div className="md:w-1/2 relative min-h-[400px] md:min-h-screen">
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop" 
          alt="Institutional Architecture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex flex-col justify-center p-12 lg:p-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="w-12 h-1 bg-brand-gold mb-8" />
            <h2 className="text-4xl lg:text-6xl font-serif text-white mb-6 leading-tight">
              Institutional <br />
              <span className="italic">Gateway</span>
            </h2>
            <p className="text-gray-300 max-w-md text-lg font-light leading-relaxed">
              Welcome to the Aura Private Vault. Access real-time asset performance, proprietary market intelligence, and exclusive institutional inventory.
            </p>
            <div className="mt-12 flex items-center gap-6 text-brand-gold/50">
               <div className="flex flex-col">
                  <span className="text-white font-bold text-2xl">256-bit</span>
                  <span className="text-[10px] uppercase tracking-widest">Encryption</span>
               </div>
               <div className="w-px h-8 bg-white/10" />
               <div className="flex flex-col">
                  <span className="text-white font-bold text-2xl">Tier 1</span>
                  <span className="text-[10px] uppercase tracking-widest">Security</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-brand-charcoal/30">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {view === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2">Vault Entry</h3>
                  <p className="text-gray-400 text-sm">Please authenticate to continue to your dashboard.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
                      {error}
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Identity / Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-gold transition-colors" size={18} />
                      <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="institutional_id@aura.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold/40 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Password</label>
                      <button type="button" onClick={() => setView('forgot')} className="text-[10px] uppercase tracking-widest text-brand-gold/70 hover:text-brand-gold transition-colors">Forgot Access?</button>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-gold transition-colors" size={18} />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold/40 transition-all"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="w-full bg-brand-gold text-brand-dark py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-lg shadow-brand-gold/10 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Verifying...</> : <>Secure Login <ChevronRight size={18} /></>}
                  </button>
                </form>
              </motion.div>
            )}

            {view === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <button onClick={() => setView('login')} className="text-[10px] uppercase tracking-widest text-brand-gold flex items-center gap-1 mb-6 hover:text-white transition-colors">
                     Back to Login
                  </button>
                  <h3 className="text-2xl font-serif text-white mb-2">Access Recovery</h3>
                  <p className="text-gray-400 text-sm">Enter your institutional email to initiate reset.</p>
                </div>

                <form onSubmit={handleForgot} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Institutional Email</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="investor@institution.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold/40 transition-all"
                    />
                  </div>
                  <button
                    disabled={isSubmitting}
                    className="w-full bg-brand-gold text-brand-dark py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-all"
                  >
                    {isSubmitting ? <Loader2 size={18} className="animate-spin mx-auto" /> : "Request Reset Link"}
                  </button>
                </form>
              </motion.div>
            )}

            {view === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mx-auto mb-8">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-serif text-white mb-4">Verification Sent</h3>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  A secure link has been dispatched to <span className="text-white font-medium">{email}</span>. Please verify with your security token.
                </p>
                <button 
                  onClick={() => setView('login')}
                  className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold border-b border-brand-gold/30 pb-1 hover:border-brand-gold transition-all"
                >
                  Return to Portal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-center gap-3 text-[10px] text-gray-500 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-brand-gold" />
            Institutional Grade Encryption Active
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorSection;