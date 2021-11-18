import React, {
  useEffect,
  useContext,
  createContext,
  useCallback,
  useState,
} from "react";
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
  nftHoldings: "NFTs Holdings",
  tokenHoldings: "Token Holdings",
  govTokenHoldings: "Gov Token Holdings",
  compoundInteractions: "Compound Interactions",
  scamTokenHoldings: "Scam Token Holdings",
};

export const ScoreCriteriaDetails = {
  cumulativeBalance: "Balance of your wallet summed with your token balances",
  nftHoldings: "Mean number of transactions per month",
  tokenHoldings: "Amount of tokens held",
  govTokenHoldings: "Amount of governance tokens held",
  compoundInteractions: "Number of interactions with Compound protocol",
  scamTokenHoldings: "Amount of scam tokens held",
};

export const ScoreCriteriaLabels = {
  cumulativeBalance: "ETH",
  nftHoldings: "NFTs",
  tokenHoldings: "tokens",
  govTokenHoldings: "gov tokens",
  compoundInteractions: "interactions",
  scamTokenHoldings: "scam tokens",
};

export const BonusScoreCriteria = {
  ens: "ENS Domain Holder",
  zapper: "Zapper.fi NFTs Holder",
  aave: "Aave Lender",
};

export const BonusScoreCriteriaDetails = {
  ens: "You own an ENS domain linked to your address",
  zapper: "You hold NFTs from Zapper's Zapperverse",
  aave: "Your are lending funds on the Aave protocol",
};

export function ScoreCriteriaIcon(criteria) {
  switch (criteria) {
    case "cumulativeBalance":
      return (
        <MdOutlineAccountBalanceWallet size={40} className="text-ablack" />
      );
    case "nftHoldings":
      return <RiExchangeBoxLine size={40} className="text-ablack" />;
    case "tokenHoldings":
      return <GiToken size={40} className="text-ablack" />;
    case "govTokenHoldings":
      return <RiGovernmentLine size={40} className="text-ablack" />;
    case "compoundInteractions":
      return <RiFileCodeLine size={40} className="text-ablack" />;
    case "scamTokenHoldings":
      return <GiDominoMask size={40} className="text-ablack" />;
    default:
      return null;
  }
}

export function scoreMark(score) {
  if (score === 0) return "Empty Wallet?";
  if (score <= 100 && score > 0) return "Entry Level";
  if (score <= 500 && score > 100) return "Healthy Score";
  if (score <= 800 && score > 500) return "Excellent!";
  else return "Perfect Score";
}

/**************************************************************************
 **	Default states for scoring and scoringValues
 **************************************************************************/
const defaultScoring = {
  score: 0,
  baseScore: {
    cumulativeBalance: 0,
    nftHoldings: 0,
    tokenHoldings: 0,
    govTokenHoldings: 0,
    compoundInteractions: 0,
    scamTokenHoldings: 0,
  },
  protocolScore: {},
};

const defaultScoringValues = {
  baseScore: {
    cumulativeBalance: 0,
    nftHoldings: 0,
    tokenHoldings: 0,
    govTokenHoldings: 0,
    compoundInteractions: 0,
    scamTokenHoldings: 0,
  },
  protocolScore: {},
};

const Scoring = createContext();

export const ScoringContextApp = ({ children }) => {
  const web3Context = useWeb3React();
  const { account, chainId } = web3Context;
  const [scoring, setScoring] = useState(defaultScoring);
  const [scoringValues, setScoringValues] = useState(defaultScoringValues);
  const [loaded, setLoaded] = useState(false);

  /**************************************************************************
   **	Fetches scoring data and updates context state scoring and scoringValues
   **************************************************************************/
  async function updateScoring(address, chainId) {
    const score = await computeScore(address, chainId);
    if (score) {
      setScoring({
        score: score.total_score,
        baseScore: {
          cumulativeBalance: 0,
          txFreq: 0,
          tokenHoldings: 0,
          govTokenHoldings: 0,
          smartContractInteractions: 0,
          scamTokenHoldings: 0,
        },
      });
      setScoringValues({
        baseScore: {
          cumulativeBalance: 0,
          txFreq: 0,
          tokenHoldings: 0,
          govTokenHoldings: 0,
          smartContractInteractions: 0,
          scamTokenHoldings: score.scam_score,
        },
        protocolScore: {},
      });
      setLoaded(true);
    }
  }

  useEffect(() => {
    if (account) {
      setLoaded(false);
      updateScoring(account, chainId);
    }
  }, [account, chainId]);

  return (
    <Scoring.Provider
      value={{
        scoring,
        scoringValues,
        loaded,
      }}
    >
      {children}
    </Scoring.Provider>
  );
};

export const useScoring = () => useContext(Scoring);
export default useScoring;
