import React, { useEffect, useContext, createContext, useCallback } from "react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GiToken, GiDominoMask } from "react-icons/gi";
import {
  RiGovernmentLine,
  RiFileCodeLine,
  RiExchangeBoxLine,
} from "react-icons/ri";
import { computeScore } from "../actions/scoring";
import { useWeb3React } from "@web3-react/core";

export const ScoreCriteria = {
  cumulativeBalance: "Cumulative Balance",
  txFreq: "Transactions Frequency",
  tokenHoldings: "Token Holdings",
  govTokenHoldings: "Gov Token Holdings",
  smartContractInteractions: "Smart Contrat Interactions",
  scamTokenHoldings: "Scam Token Holdings",
};

export const ScoreCriteriaDetails = {
  cumulativeBalance: "Balance of your wallet summed with your token balances",
  txFreq: "Mean number of transactions per month",
  tokenHoldings: "Amount of tokens held",
  govTokenHoldings: "Amount of governance tokens held",
  smartContractInteractions: "Number of calls to smart contracts",
  scamTokenHoldings: "Amount of scam tokens held",
};

export const ScoreCriteriaLabels = {
  cumulativeBalance: "ETH",
  txFreq: "txs/month",
  tokenHoldings: "tokens",
  govTokenHoldings: "gov tokens",
  smartContractInteractions: "calls",
  scamTokenHoldings: "scam tokens",
};

export const BonusScoreCriteria = {
  ens: "ENS Domain Holder",
};

export const BonusScoreCriteriaDetails = {
  ens: "You own an ENS domain linked to your address",
};

export function ScoreCriteriaIcon(criteria) {
  switch (criteria) {
    case "cumulativeBalance":
      return (
        <MdOutlineAccountBalanceWallet size={40} className="text-ablack" />
      );
    case "txFreq":
      return <RiExchangeBoxLine size={40} className="text-ablack" />;
    case "tokenHoldings":
      return <GiToken size={40} className="text-ablack" />;
    case "govTokenHoldings":
      return <RiGovernmentLine size={40} className="text-ablack" />;
    case "smartContractInteractions":
      return <RiFileCodeLine size={40} className="text-ablack" />;
    case "scamTokenHoldings":
      return <GiDominoMask size={40} className="text-ablack" />;
    default:
      return null;
  }
};

export function scoreMark(score) {
  if (score === 0) return "Empty Wallet?";
  if (score <= 100 && score > 0) return "Entry Level";
  if (score <= 500 && score > 100) return "Healthy Score";
  if (score <= 800 && score > 500) return "Excellent!";
  else return "Perfect Score";
}

const Scoring = createContext();

export const ScoringContextApp = ({ children }) => {
  const scoring = {
    score: 687,
    baseScore: {
      cumulativeBalance: 50,
      txFreq: 30,
      tokenHoldings: 25,
      govTokenHoldings: 34,
      smartContractInteractions: 55,
      scamTokenHoldings: -20,
    },
    protocolScore: {
      ens: 200,
    },
  };

  const scoringValues = {
    baseScore: {
      cumulativeBalance: 2439,
      txFreq: 2.3,
      tokenHoldings: 7,
      govTokenHoldings: 2,
      smartContractInteractions: 11,
      scamTokenHoldings: 1,
    },
    protocolScore: {
      ens: "0xwassim.eth",
    },
  };

  const scoreFetch = useCallback(async (address, chainId) => {
    const score = await computeScore(address, chainId);
    return score;
  }, []);

  // const scoreContext = useScoring();
  // const { scoreFetch } = scoreContext;

  // const web3Context = useWeb3React();
  // const { account, chainId } = web3Context;

  // useEffect(() => {
  //   scoreFetch(account, chainId);
  // }, [account, chainId]);

  return (
    <Scoring.Provider
      value={{
        scoring,
        scoreMark,
        scoringValues,
        scoreFetch,
      }}
    >
      {children}
    </Scoring.Provider>
  );
};

export const useScoring = () => useContext(Scoring);
export default useScoring;
