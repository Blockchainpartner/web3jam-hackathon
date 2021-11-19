import React, { useContext, createContext, useState } from "react";
import {
  mintToken,
  retreiveTokenId,
} from "../actions/nftMinting";

const Nft = createContext();

export const NftContextApp = ({ children }) => {
  const [nftId, setNftId] = useState();
  const [loading, setLoading] = useState(false);

  async function mintNftFromScore(address, scores) {
    setLoading(true);
    const mintData = await mintToken(address, scores);
    await setTimeout(async () => {
      const nftData = await retreiveTokenId(mintData.transaction_hash);
      setNftId(nftData.token_id);
      setLoading(false);
    }, 15000);
  }

  return (
    <Nft.Provider
      value={{
        nftId,
        loading,
        mintNftFromScore,
      }}
    >
      {children}
    </Nft.Provider>
  );
};

export const useNftContext = () => useContext(Nft);
export default useNftContext;
