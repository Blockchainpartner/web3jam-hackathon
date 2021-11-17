
const axios = require('axios').default;
const fs = require('fs');
const FormData = require('form-data');


const API_NFTPORT = "a087f39c-3561-4f92-90e2-b71fcf6c5cec"
//contract owner
const ADDRESS_NFT = "0x432075C8Ba667C724e15Ec7dB20A5f2441679a6f"
//contract address, deployed using deployContract()
const CONTRACT_ADDRESS = "0xA368eeb3Da7148158771982D793825E9b553429D";

/**
 * @abstract function that deploys a NFT smart-contract using NFTPort API.
 */
let deployContract = async () => {
    //params of the API call.
    const options = {
        method: 'POST',
        headers: { 
            'Authorization': API_NFTPORT
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
    let txHash = "0x61f4eebfb09cb4eb0448416e80c1238653a3c80a07c52923c2e23ff6e5716a8b";
    let chain = "rinkeby";
    let options = {
        method: 'GET',
        headers: { 
            'Authorization': API_NFTPORT
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
        Authorization: API_NFTPORT,
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
let imgResponse = {
    "response": "OK",
    "ipfs_url": "https://ipfs.io/ipfs/Qmew7RWnByXhsF89TbkhXRzdaYJdk96fbcmmRtbJfDq2XT",
    "file_name": "logo.png",
    "content_type": "image/png",
    "file_size": 1875,
    "file_size_mb": 0.0018,
    "error": null
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
        Authorization: API_NFTPORT,
      },
      data: {
        name: 'dyFactor Score',
        file_url: 'https://ipfs.io/ipfs/Qmew7RWnByXhsF89TbkhXRzdaYJdk96fbcmmRtbJfDq2XT'
        
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response);
    })
}

let mintToken = async (addr, scores) => {
    
    //upload metadata for addr.scores
    let response = await uploadNFTMetadata(addr, scores);
    let metadatasURI = await response.metadata_uri;


    const options = {
        method: 'POST',
        url: 'https://api.nftport.xyz/v0/mints/customizable',
        headers: {
          'Content-Type': 'application/json',
          Authorization: API_NFTPORT
        },
        data: {
          chain: 'rinkeby',
          contract_address: CONTRACT_ADDRESS,
          metadata_uri: metadatasURI,
          mint_to_address: addr,
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
}



let main = async () => {
    //deployContract()
    // getContractAddress().then(r => console.log(r))
    // uploadImage()
    // mintToken(ADDRESS_NFT, [600])
    uploadNFTMetadata(ADDRESS_NFT, {address: ADDRESS_NFT, scores: 600})

}
main()
// deployContract()

