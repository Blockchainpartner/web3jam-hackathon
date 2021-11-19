import axios from "axios";
import { ethers } from "ethers";
import { FormData } from "form-data";
import { toast } from "react-toastify";

//contract owner
const ADDRESS_NFT = "0x432075C8Ba667C724e15Ec7dB20A5f2441679a6f";
//contract address, deployed using deployContract()
export const NFT_CONTRACT_ADDRESS = "0xA368eeb3Da7148158771982D793825E9b553429D";

const CONTRACT_DEPLOYMENT_TXHASH =
  "0x61f4eebfb09cb4eb0448416e80c1238653a3c80a07c52923c2e23ff6e5716a8b";

const IMAGE_RESPONSE = {
  response: "OK",
  ipfs_url:
    "https://ipfs.io/ipfs/Qmew7RWnByXhsF89TbkhXRzdaYJdk96fbcmmRtbJfDq2XT",
  file_name: "logo.png",
  content_type: "image/png",
  file_size: 1875,
  file_size_mb: 0.0018,
  error: null,
};

/**
 *
 * @param {json of scores} scores
 */
async function uploadNFTMetadata(addr, scores) {
  const data_struct = {
    address: addr,
    scores: scores,
  };
  const options = {
    method: "POST",
    url: "https://api.nftport.xyz/v0/metadata",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NFTPORT_KEY,
    },
    data: {
      name: "dyFactor Score",
      description: "score",
      file_url: IMAGE_RESPONSE.ipfs_url,
      custom_fields: data_struct,
    },
  };

  let res = await axios.request(options);
  return res.data.metadata_uri;
}

export async function retreiveTokenId(txHash) {
  const options = {
    method: "GET",
    url: `https://api.nftport.xyz/v0/mints/${txHash}`,
    params: { chain: "rinkeby" },
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NFTPORT_KEY,
    },
  };

  try {
    let res = await axios.request(options);
    return res.data;
  } catch (e) {
    console.error(e);
    toast.error("Retreiving NFT ID not working. See console.");
  }
}

/**
 *
 * @param {user address. NFT is minted to addr} addr
 * @param {scores breakdown json. Supposed to be returned by computeScore() from scoring.js} scores
 */
export async function mintToken(addr, scores) {
  let metadatasURI = await uploadNFTMetadata(addr, scores);

  const options = {
    method: "POST",
    url: "https://api.nftport.xyz/v0/mints/customizable",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NFTPORT_KEY,
    },
    data: {
      chain: "rinkeby",
      contract_address: NFT_CONTRACT_ADDRESS,
      metadata_uri: metadatasURI,
      mint_to_address: addr,
    },
  };

  try {
    let res = await axios.request(options);
    return res.data;
  } catch (e) {
    console.error(e);
    toast.error("Mint not working. See console.");
  }
}
