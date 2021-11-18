const axios = require('axios').default;
var Web3 = require('web3');

// import ENS, { getEnsAddress } from '@ensdomains/ensjs';

// var accounts = ethereum.enable();
// var web3 = new Web3(ethereum);

// 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B vb
// 0x96Df52cc3f98855b107342566941D34e908aD448


//TESTNET KOVAN - 42

const chainID = 1;
const api_covalent = `https://api.covalenthq.com/v1/${chainID}/address`;
const API_KEY = "ckey_0c9b908d2a0a4ccdb386f0300c8";
const ADDRESS = "0x96Df52cc3f98855b107342566941D34e908aD448";
const ADDRESS_WAWA = "0xa408ddd1bea8f798449e79c0e8a25d8b301e526b";
const API_NFTPORT = "a087f39c-3561-4f92-90e2-b71fcf6c5cec"


//###################### USER BALANCE / TOKENS #############################
//add address in params
//should return the balance array
let getAllTokenBalances = async function (addr) {
    /**
     * @param {arr is the response of covalent api} arr 
     * @returns take the api response and turns it into a beautiful human readable array
     */
    function transformArray(arr){
        let newTab = [];
        for(obj in arr){
            newTab.push({
                token: arr[obj].contract_ticker_symbol, 
                amount:  Web3.utils.fromWei(arr[obj].balance), 
                USD: arr[obj].quote})
        }
        return newTab; 
    }
    let balances = [];
    try {
        //call api
        let res = await axios.get(`${api_covalent}/${addr}/balances_v2/?nft=false&key=${API_KEY}`)
        let balances = await transformArray(res.data.data.items);

        return balances;
    }
    catch (e){
        console.log("ERREUR > " + e);
    }
}
/**
 * @async
 * @abstract function that returns the USD balance of addr
 * @param input an address addr
 * @returns USD balance of addr
 */
let getUSDBalance = async function (addr) {
    let balanceArray = await getAllTokenBalances(addr);
    let result = 0;
    for(obj in balanceArray){
        result += balanceArray[obj].USD;
    }
    return result;
}

//0-100, 100-1000 ,1000-10000, >10000
let getScamTokens = async function (addr, tokenList) {
    let scamTokens = ["FF9.io", "🧙‍♂️WIZ🧙‍♂️"];
    // let tokenList = await getAllTokenBalances(addr);
    let counter = 0;
    // not the most efficient method but works fine :)
    for (obj in tokenList){
        for(i=0; i<scamTokens.length; i++){
            //check if govTokens are in tokenList
            if(tokenList[obj].token == scamTokens[i] && tokenList[obj].amount != 0){
                counter++;
            }
        }
    }
    return counter;     
}
//###################### GOVERNANCE SCORE #############################
//Governance tokens holdings + votes 
// for the hackaton, tokens = ENS + aave/stkAave + Comp + CRV

/**
 * 
 * @param {user address} address 
 * @returns should return the amount of governance tokens held by address. 
 * The amount of token is not integrated i.e if address holds 0.0001 AAVE or 10000 AAVE, it counts 1
 */
async function getGovernanceTokens(address, tokenList) {
    let govTokens = ["ENS", "AAVE", "stkAAVE", "COMP", "CRV"];
    // let tokenList = await getAllTokenBalances(address);
    let counter = 0;
    // not the most efficient method but works fine :)
    for (obj in tokenList){
        for(i=0; i<govTokens.length; i++){
            //check if govTokens are in tokenList
            if(tokenList[obj].token == govTokens[i] && tokenList[obj].amount != 0){
                counter++;
            }
        }
    }
    return counter; 
}

/**
 * 
 * @param {user address} address 
 * 
 */
async function getAaveGovernanceVotes(address) {
    
    let response = await axios.get(`https://aave-api-v2.aave.com/data/governance-user-search?address=${address}`)
    let score = 0;
    if(response.data != null){
        score = response.data.votingHistory.length;
    }
    return score;

}

/** 
 * add address in params
 * should return address's interecations with Compound 
 * Select borrow and repay events
*/
async function getCompoundInteractions(address) {
    try {
        let response = await axios.get(`${api_covalent}/${address}/stacks/compound/acts/?key=${API_KEY}`);

        return response.data.data.items.length
    }
    catch (e){
        console.log("Something went wrong :/, cannot fetch compound data > " + e);
    }
}

//###################### ENS #############################
/**
 * @abstract 
 * @param {address to look for ENS} address 
 * @returns {true or false} boolean
 */
async function hasENS(address){
    const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
    let names = await ens.getNames(address).then(r => console.log(r));
    
}

//###################### NFTs #############################
/**
 * @abstract 
 * @param {user address} address 
 * @returns {number of NFTs owned by address} int
 */
async function getNFTs(address){
    const options = {
    method: 'GET',
    url: `https://api.nftport.xyz/v0/accounts/${address}`,
    params: {chain: 'ethereum'},
    headers: {
        'Content-Type': 'application/json',
        Authorization: API_NFTPORT
    }
    };

    try{
        let res = await axios.request(options)
        return (res.data.nfts)
    }
    catch(e){
        console.log(e)
    }
}

async function getZapperNFT(address) {
    zapper_contract = "0xf1f3ca6268f330fda08418db12171c3173ee39c9";

}

//###################### TOTAL SCORE #############################

/**
 * @returns Score of the user
 * @param address of the user
 * @abstract This function should return the score of the entered address. It aggregates several data inputs.
 * The score is: score = base + balanceScore + govScore + 
 * @todo all
 */
async function computeScore(address) {
    //TODO
    // why 500 ? why not.
    let baseScore = 500;

    let score = baseScore;
    //get token list
    let tokenList = await getAllTokenBalances(address);
    //get scores
    let scamTokenScore = await getScamTokens(address, tokenList);
    let govTokenScore = await getGovernanceTokens(address, tokenList);
    let aaveGovScore = await getAaveGovernanceVotes(address);
    
    let compInteractionScore = await getCompoundInteractions(address);


    // let ensScore = await hasENS(address);
    score += scamTokenScore + govTokenScore + aaveGovScore + compInteractionScore;
    return {
        total_score: score,
        scam_score: scamTokenScore,
        governance_score: govTokenScore,
        aave_votes: aaveGovScore,
        compound_interactions: compInteractionScore,
        // scam_score: scamTokenScore,
        // governance_score: govTokenScore

    }
}

// callAPI_Compound = "https://api.covalenthq.com/v1/1/address/0x96Df52cc3f98855b107342566941D34e908aD448/stacks/compound/acts/?key=ckey_0c9b908d2a0a4ccdb386f0300c8"

async function main(address){

    // let counter = 0;
    // let res = await getAllTokenBalances(address).then(res => console.log(res))
    
    // let res2 = await getGovernanceTokens(address)
    // let res3 = await getAaveGovernanceVotes(address);
    // let res4 = await getCompoundInteractions(address)
    // let res5 = await hasENS(address);
    // let res6 = await getScamTokens(address, res).then(r => console.log(r));
    // computeScore(address).then(r => console.log(r));
    getNFTs(address).then(r => console.log(r))
}
//0xc17cb209d5abdb2d00f566a1e48f558debc264e1 aave gov
main(ADDRESS)
