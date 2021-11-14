import React, { useState } from "react";

const WalletInput = () => {
  const [address, setAddress] = useState("");
  return (
    <div className="w-2/3 box my-8 flex items-center justify-between">
      <input
        className="sp-input"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        type="text"
        placeholder="Enter your address or ..."
      />
      <button className="btn">{"Connect Wallet"}</button>
    </div>
  );
};

const Landing = () => {
  return (
    <div className="w-full m-auto grid grid-cols-2">
      {/* LEFT SIDE */}
      <div className="flex justify-start items-center">
        <div className="flex flex-col">
          <h1 className="font-bold">{"Your pluggable Web3 score generator"}</h1>
          <span className="w-2/3">
            <p className="text-subtxt text-xl font-normal mt-5">
              {
                "Generate your wallet's score based on your past activites, and access advantages and bonuses in decentralized protocols"
              }
            </p>
          </span>
          <WalletInput />
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center">
        <img src="/home-bg.png" alt="dyFactor - Illustration" />
      </div>
    </div>
  );
};

export default Landing;
