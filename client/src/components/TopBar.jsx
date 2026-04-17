import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-brand-primary text-brand-dark py-1.5 px-4 text-center text-xs tracking-[0.25em] font-semibold uppercase flex justify-center items-center gap-4">
      <span className="hidden md:inline">✦</span>
      <span>Exclusive Winter Collection - Accepting International Bids</span>
      <span className="hidden md:inline">✦</span>
    </div>
  );
};

export default TopBar;
