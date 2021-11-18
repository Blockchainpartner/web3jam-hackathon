import axios from "axios";
import { toast } from "react-toastify";
import ENS, { getEnsAddress } from "@ensdomains/ensjs";
import Web3 from "web3";

const SCAM_TOKENS = ["FF9.io", "🧙‍♂️WIZ🧙‍♂️"];
const GOV_TOKENS = ["ENS", "AAVE", "stkAAVE", "COMP", "CRV"];
const ZAPPER_CONTRACT = "0xf1f3ca6268f330fda08418db12171c3173ee39c9";
const BASE_SCORE = 500;

const AAVEGOV_URI = (address) =>
  `https://aave-api-v2.aave.com/data/governance-user-search?address=${address}`;
const COVALENT_URI = (chainId) =>
  `https://api.covalenthq.com/v1/${chainId}/address`;
const COMPOUND_URI = (address, chainId) =>
  `${COVALENT_URI(chainId)}/${address}/stacks/compound/acts/?key=${
    process.env.COVALENT_KEY
  }`;

//###################### USER BALANCE / TOKENS #############################

async function getAllTokenBalances(address, chainId) {
  /**
   * @param {arr is the response of covalent api} arr
   * @returns take the api response and turns it into a beautiful human readable array
   */
  function transformArray(arr) {
    let newTab = [];
    for (let obj in arr) {
      newTab.push({
        token: arr[obj].contract_ticker_symbol,
        amount: Web3.utils.fromWei(arr[obj].balance),
        USD: arr[obj].quote,
      });
    }
    return newTab;
  }
  let balances = [];
  try {
    //call api
    let res = await axios.get(
      `${COVALENT_URI(chainId)}/${address}/balances_v2/?nft=false&key=${
        process.env.COVALENT_KEY
      }`
    );
    let balances = await transformArray(res.data.data.items);

    return balances;
  } catch (e) {
    console.log("Error: " + e);
    toast.error("Couldn't fetch Covalent balances. See console.");
  }
}

async function getUSDBalance(address) {
  let balanceArray = await getAllTokenBalances(address);
  let result = 0;
  for (let obj in balanceArray) {
    result += balanceArray[obj].USD;
  }
  return result;
}

async function getScamTokens(tokenList) {
  return tokenList
    .map((token) => token.token)
    .filter((t) => SCAM_TOKENS.includes(t)).length;
}

//###################### GOVERNANCE SCORE #############################
//Governance tokens holdings + votes
// for the hackaton, tokens = ENS + aave/stkAave + Comp + CRV

async function getGovernanceTokens(tokenList) {
    return tokenList
    .map((token) => token.token)
    .filter((t) => GOV_TOKENS.includes(t)).length;
}

async function getAaveGovernanceVotes(address) {
  const response = await axios.get(AAVEGOV_URI(address));
  let score = 0;
  if (response.data != null) {
    score = response.data.votingHistory.length;
  }
  return score;
}

async function getCompoundInteractions(address, chainId) {
  try {
    const response = await axios.get(COMPOUND_URI(address, chainId));
    return response.data.data.items.length;
  } catch (e) {
    console.log("Error fetching Compound data: " + e);
    toast.error("Error fetching Compound data. See console.");
  }
}

//###################### ENS #############################
async function hasENS(address) {
  const ens = new ENS({ provider, ensAddress: getEnsAddress("1") });
  const names = await ens.getNames(address).then((r) => console.log(r));
}

//###################### NFTs #############################

async function getZapperNFT(address) {}

//###################### TOTAL SCORE #############################
export async function computeScore(address, chainId) {
  let score = BASE_SCORE;
  //get token list
  const tokenList = await getAllTokenBalances(address, chainId);
  //get scores
  const scamTokenScore = await getScamTokens(tokenList);
  const govTokenScore = await getGovernanceTokens(tokenList);
  const aaveGovScore = await getAaveGovernanceVotes(address);
  const compInteractionScore = await getCompoundInteractions(address, chainId);
  // let ensScore = await hasENS(address);

  score += -scamTokenScore + govTokenScore + aaveGovScore + compInteractionScore;
  return {
    total_score: score,
    scam_score: scamTokenScore,
    governance_score: govTokenScore,
    aave_votes: aaveGovScore,
    compound_interactions: compInteractionScore,
    // scam_score: scamTokenScore,
    // governance_score: govTokenScore
  };
}
