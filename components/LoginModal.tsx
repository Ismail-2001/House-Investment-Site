import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!email || !password) {
      setError('Please provide both credentials to access the vault.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid institutional email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setError('Invalid credentials. Please contact your account manager for assistance.');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-brand-charcoal border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)]"
          >
            {/* Header Decorations */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
            
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-gold rounded-sm transform rotate-45 flex items-center justify-center">
                    <div className="w-4 h-4 bg-brand-dark transform" />
                  </div>
                  <span className="text-xl font-serif font-bold text-white tracking-wide uppercase">
                    Aura Vault
                  </span>
                </div>
                <button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-white transition-colors p-2 -mr-2"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-serif text-white mb-2">Investor Access</h2>
                <p className="text-sm text-gray-400">Authenticated entry for institutional partners.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-xs text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">
                    Institutional Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-gold transition-colors" size={18} />
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="investor@institution.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold/40 focus:bg-white/10 transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                      Password
                    </label>
                    <button 
                      type="button" 
                      className="text-[10px] uppercase tracking-widest text-brand-gold/70 hover:text-brand-gold transition-colors font-bold"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-gold transition-colors" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold/40 focus:bg-white/10 transition-all placeholder:text-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-gold text-brand-dark py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-lg shadow-brand-gold/10 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Authenticating...
                    </>
                  ) : (
                    <>Secure Access</>
                  )}
                </motion.button>
              </form>

              <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-brand-gold" />
                End-to-End Encrypted Session
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;