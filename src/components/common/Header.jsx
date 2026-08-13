import React from 'react';

export const Header = () => {
  return (
    <header className="w-full top-0 sticky bg-background border-b border-secondary-container z-40">
      <div className="flex justify-center items-center px-4 md:px-16 py-4 w-full max-w-[1440px] mx-auto">
        <h1 className="font-headline-md text-headline-md text-primary tracking-widest uppercase text-center">
          HH GOA 2026
        </h1>
      </div>
    </header>
  );
};
