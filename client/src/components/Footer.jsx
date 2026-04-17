import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-brand-primary/20 bg-black/60 backdrop-blur-md pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16">
        
        {/* About Section */}
        <div className="space-y-4">
          <h4 className="text-xl font-serif text-brand-primary uppercase tracking-widest">About Prestige</h4>
          <p className="text-brand-accent/70 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
            Prestige Auctions represents the absolute pinnacle of luxury curation. Specializing in rare timepieces, hypercars, multi-carat diamonds, and historically significant fine art, we facilitate high-stakes, anonymous bidding for the world's absolute elite.
          </p>
        </div>

        {/* Global Vault Links */}
        <div className="space-y-4">
          <h4 className="text-xl font-serif text-brand-primary uppercase tracking-widest">Global Facilities</h4>
          <ul className="text-brand-accent/70 text-sm space-y-2 uppercase tracking-wider">
            <li>Geneva Vault</li>
            <li>Dubai Operations</li>
            <li>Monaco Harbor</li>
            <li>New York Showroom</li>
          </ul>
        </div>

        {/* Legal & Security */}
        <div className="space-y-4">
          <h4 className="text-xl font-serif text-brand-primary uppercase tracking-widest">Assurance</h4>
          <ul className="text-brand-accent/70 text-sm space-y-2 uppercase tracking-wider">
            <li>Cryptographic Security</li>
            <li>Authenticity Guarantee</li>
            <li>Private Wealth Transport</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 border-t border-brand-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-brand-accent/40 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} Prestige Auctions Ltd. All Rights Reserved.
        </p>
        <div className="text-brand-primary/60 text-xs tracking-widest uppercase flex gap-4">
            <span>Encrypted Market</span>
            <span>✦</span>
            <span>Zero Knowledge Proofs</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
