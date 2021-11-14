import { useWeb3 } from "@openzeppelin/network/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

function getProvider() {
  return new ethers.providers.JsonRpcProvider("https://rpc.ftm.tools");
}

const Web3Context = createContext();

export const Web3ContextApp = ({ children }) => {
  // Get web3 context via @openzeppelin/network/react hook
  const web3Context = useWeb3(
    `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_ID}`
  );
  const { accounts, networkId, networkName, providerName, lib, connected } =
    web3Context;

  // Methods for requesting accounts access
  const requestAuth = (web3Context) => web3Context.requestAuth();
  const requestAccess = useCallback(() => requestAuth(web3Context), []);

  const provider = getProvider();

  // Querying account balance
  const [balance, setBalance] = useState(0);
  const getBalance = useCallback(async () => {
    setBalance(
      accounts && accounts.length > 0
        ? await provider.getBalance(accounts[0])
        : "Unknown"
    );
  }, [accounts, provider]);

  useEffect(() => {
    getBalance();
  }, [accounts, getBalance, networkId]);

  return (
    <Web3Context.Provider
      value={{
        accounts,
        balance,
        networkName,
        providerName,
        lib,
        connected,
        provider,
        getProvider,
        currentRPCProvider: provider,
        requestAuth,
        requestAccess
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Ctx = () => useContext(Web3Context);
export default useWeb3Ctx;
