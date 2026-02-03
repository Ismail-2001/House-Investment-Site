import React from 'react';
import { NAV_LINKS } from '../constants';

interface FooterProps {
  onLoginClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLoginClick }) => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-brand-dark pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-brand-gold rounded-sm transform rotate-45 flex items-center justify-center">
                <div className="w-3 h-3 bg-brand-dark transform" />
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-wide">
                AURA
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leading the future of luxury hospitality investment. Precision, elegance, and superior returns.
            </p>
          </div>

          <div>
            <h4 className="text-white font-serif mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li><button onClick={onLoginClick} className="hover:text-brand-gold transition-colors">Investor Login</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Amsterdam, Netherlands</li>
              <li>info@aura-investments.com</li>
              <li>+31 20 123 4567</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif mb-6">Newsletter</h4>
            <p className="text-xs text-gray-500 mb-4">Subscribe for exclusive market reports.</p>
            <div className="flex">
              <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 px-4 py-2 text-sm text-white focus:outline-none w-full" />
              <button className="bg-brand-gold text-brand-dark px-4 py-2 text-sm font-bold uppercase hover:bg-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Aura Hospitality Investments. All rights reserved.</p>
          <p>Designed for Tailored Commerce</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;