import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useContext, createContext, useState } from "react";
import {
  fetchUserScoreNft,
  mintToken,
  retreiveTokenId,
} from "../actions/nftMinting";
import useScoring from "./scoringContext";

const Nft = createContext();

export const NftContextApp = ({ children }) => {
  const web3Context = useWeb3React();
  const { account } = web3Context;

  const [nft, setNft] = useState();
  const [loading, setLoading] = useState(false);

  async function mintNftFromScore(address, scores) {
    setLoading(true);
    const mintData = await mintToken(address, scores);
    await setTimeout(async () => {
      const nftData = await retreiveTokenId(mintData.transaction_hash);
      setNft(nftData.token_id);
      setLoading(false);
    }, 15000);
  }

  async function updateNft() {}

  //   useEffect(() => {
  //     console.log("LOADER", loading);
  //   }, [loading]);

  return (
    <Nft.Provider
      value={{
        nft,
        loading,
        mintNftFromScore,
      }}
    >
      {children}
    </Nft.Provider>
  );
};

export const useNft = () => useContext(Nft);
export default useNft;
