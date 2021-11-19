import axios from "axios";
import {fs} from "fs";
import {FormData} from 'form-data';
import { toast } from "react-toastify";
import ENS, { getEnsAddress } from "@ensdomains/ensjs";
import Web3 from "web3";
import { ethers } from "ethers";

const ZAPPER_CONTRACT = "0xf1f3ca6268f330fda08418db12171c3173ee39c9";

const AAVEGOV_URI = (address) =>
  `https://aave-api-v2.aave.com/data/governance-user-search?address=${address}`;

//contract owner
const ADDRESS_NFT = "0x432075C8Ba667C724e15Ec7dB20A5f2441679a6f"
//contract address, deployed using deployContract()
const CONTRACT_ADDRESS = "0xA368eeb3Da7148158771982D793825E9b553429D";

const CONTRACT_DEPLOYMENT_TXHASH = "0x61f4eebfb09cb4eb0448416e80c1238653a3c80a07c52923c2e23ff6e5716a8b"

const IMAGE_RESPONSE = {
  "response": "OK",
  "ipfs_url": "https://ipfs.io/ipfs/Qmew7RWnByXhsF89TbkhXRzdaYJdk96fbcmmRtbJfDq2XT",
  "file_name": "logo.png",
  "content_type": "image/png",
  "file_size": 1875,
  "file_size_mb": 0.0018,
  "error": null
}
  /**
   * @abstract function that deploys a NFT smart-contract using NFTPort API.
   */
let deployContract = async () => {
    //params of the API call.
    const options = {
        method: 'POST',
        headers: { 
            'Authorization': process.env.NFTPORT_KEY
        },
        data: {
            "chain": "rinkeby",
            "name": "DYFACTOR",
            "symbol": "DFC",
            "owner_address": ADDRESS_NFT
        },
        url: "https://api.nftport.xyz/v0/contracts",
      };
    axios(options)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

let getContractAddress = async function () {
    let txHash = CONTRACT_DEPLOYMENT_TXHASH;
    let chain = "rinkeby";
    let options = {
        method: 'GET',
        headers: { 
            'Authorization': process.env.NFTPORT_KEY
        },
        url: `https://api.nftport.xyz/v0/contracts/${txHash}?chain=${chain}`,
    }
    try {
        let res = await axios(options).then(r => console.log(r))
        return res.data.contract_address
    }
    catch (e){
        console.log(e)
    }
}
  
let uploadImage = async function () {
    const form = new FormData();
    form.append("file", "logo.png");
    
    const options = {
      method: 'POST',
      url: 'https://api.nftport.xyz/v0/files',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: process.env.NFTPORT_KEY,
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
      },
      data: '[form]'
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
}



/**
 * 
 * @param {json of scores} scores 
 */

  let uploadNFTMetadata = async function (addr,scores) {

    data_struct = {
        address: addr,
        scores: scores
    }
    const options = {
      method: 'POST',
      url: 'https://api.nftport.xyz/v0/metadata',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.NFTPORT_KEY,
      },
      data: {
        name: 'dyFactor Score',
        description: 'score',
        file_url: IMAGE_RESPONSE.ipfs_url,
        custom_fields: data_struct,
      }
    };
    
    let res = await axios.request(options)
    return res.data.metadata_uri

}

/**
 * 
 * @param {user address. NFT is minted to addr} addr 
 * @param {scores breakdown json. Supposed to be returned by computeScore() from scoring.js} scores 
 */
export async function mintToken(addr, scores) {
    
    let metadatasURI = await uploadNFTMetadata(addr, scores);

    const options = {
        method: 'POST',
        url: 'https://api.nftport.xyz/v0/mints/customizable',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.NFTPORT_KEY
        },
        data: {
          chain: 'rinkeby',
          contract_address: CONTRACT_ADDRESS,
          metadata_uri: metadatasURI,
          mint_to_address: addr,
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.error(error);
      });
}


