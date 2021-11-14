import React from "react";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-start">
      <img src="/logo.png" alt="dyFactor - Home" className="h-10" />
      <div className="grid grid-rows-1 grid-cols-3 xl:gap-10 gap-6 ml-8 xl:ml-14">
        <a href="/integrations">Integrations</a>
        <a href="/tech">How it works</a>
        <a href="/about">About</a>
      </div>
    </div>
  );
};

export default Navbar;
