import React, { useEffect, useContext, createContext, useState } from "react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GiToken, GiDominoMask, GiPayMoney } from "react-icons/gi";
import { CgCardHearts } from "react-icons/cg";
import { RiGovernmentLine } from "react-icons/ri";
import { computeScore, hasENS } from "../actions/scoring";
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
  cumulativeBalance: "USD",
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
        <MdOutlineAccountBalanceWallet size={30} className="text-ablack" />
      );
    case "nftHoldings":
      return <CgCardHearts size={30} className="text-ablack" />;
    case "tokenHoldings":
      return <GiToken size={30} className="text-ablack" />;
    case "govTokenHoldings":
      return <RiGovernmentLine size={30} className="text-ablack" />;
    case "compoundInteractions":
      return <GiPayMoney size={30} className="text-ablack" />;
    case "scamTokenHoldings":
      return <GiDominoMask size={30} className="text-ablack" />;
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
  const { account, library } = web3Context;
  const [scoring, setScoring] = useState(defaultScoring);
  const [scoringValues, setScoringValues] = useState(defaultScoringValues);
  const [loaded, setLoaded] = useState(false);

  /**************************************************************************
   **	Fetches scoring data and updates context state scoring and scoringValues
   **************************************************************************/
  async function updateScoring(address, chainId, library) {
    const score = await computeScore(address, chainId, library);
    if (score) {
      setScoring({
        score: score.total_score,
        baseScore: {
          cumulativeBalance: score.usd.score,
          nftHoldings: score.nft.score,
          tokenHoldings: score.token_holdings.score,
          govTokenHoldings: score.governance.score,
          compoundInteractions: score.compound.score,
          scamTokenHoldings: score.scam.score,
        },
        protocolScore: {
          aave: score.aave.score,
          ens: score.ens.score,
          zapper: score.zapper.score
        }
      });
      setScoringValues({
        baseScore: {
          cumulativeBalance: score.usd.value,
          nftHoldings: score.nft.value,
          tokenHoldings: score.token_holdings.value,
          govTokenHoldings: score.governance.value,
          compoundInteractions: score.compound.value,
          scamTokenHoldings: score.scam_score,
        },
        protocolScore: {
          aave: score.aave.value,
          ens: score.ens.name,
          zapper: score.zapper.value
        },
      });
      setLoaded(true);
    }
  }

  useEffect(() => {
    if (library && account) {
      setLoaded(false);
      // Setting default chainId to 1 for fetching scores on Ethereum Mainnet
      updateScoring(account, 1, library);
    }
  }, [account, library]);

  useEffect(() => {
    if (scoring) {
      console.log(scoringValues)
    }
  }, [scoring]);

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
