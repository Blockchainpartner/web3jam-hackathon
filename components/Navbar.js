import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/dist/client/router";
import React from "react";

const Navbar = () => {
  const context = useWeb3React();
  const { account, network } = context;
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center justify-start">
        <img
          src="/logo.png"
          alt="dyFactor - Home"
          className="h-10 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="grid grid-rows-1 grid-cols-3 xl:gap-10 gap-6 ml-8 xl:ml-14">
          <a href="/integrations">Integrations</a>
          <a href="/tech">How it works</a>
          <a href="/about">About</a>
        </div>
      </div>
      {account ? (
        <div className="flex items-center justify-end gap-2">
          <div className="box px-4 py-2 h-9 flex items-center justify-center">
            <span className="text-sm font-medium">
              {`${account.substring(0, 6)}...${account.substring(
                account.length - 4
              )}`}
            </span>
          </div>
          <div className="box px-4 py-2 h-9 flex items-center justify-center">
            <span className="flex items-center justify-between">
              <img
                src="/icons/bsc.png"
                alt="BSC"
                className="rounded-full h-4 w-4"
              />
              <p className="ml-3 font-medium text-sm">{"BSC Mainnet"}</p>
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
