export function getLorem() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet lectus proin nibh nisl. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Massa sed elementum tempus egestas sed sed. Viverra nibh cras pulvinar mattis nunc sed. Nunc consequat interdum varius sit amet int- erdum posuere lorem ipsum dolor sit amet.";
}

export const INTEGRATION_CODE = `import React from "react";

const DyFactorButton = () => {
  return (
    <button className="btn">
      <img src="/logo-icon-white.png" alt="dyFactor" />
      {"Access with dyFactor Score"}
    </button>
  );
};

export default DyFactorButton;`;

/**
 * @abstract function that deploys a NFT smart-contract using NFTPort API.
 */
// const deployContract = async () => {
//   //params of the API call.
//   const options = {
//     method: "POST",
//     headers: {
//       Authorization: process.env.NFTPORT_KEY,
//     },
//     data: {
//       chain: "rinkeby",
//       name: "DYFACTOR",
//       symbol: "DFC",
//       owner_address: ADDRESS_NFT,
//     },
//     url: "https://api.nftport.xyz/v0/contracts",
//   };
//   axios(options)
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// async function getContractAddress() {
//   let txHash = CONTRACT_DEPLOYMENT_TXHASH;
//   let chain = "rinkeby";
//   let options = {
//     method: "GET",
//     headers: {
//       Authorization: process.env.NFTPORT_KEY,
//     },
//     url: `https://api.nftport.xyz/v0/contracts/${txHash}?chain=${chain}`,
//   };
//   try {
//     let res = await axios(options).then((r) => console.log(r));
//     return res.data.contract_address;
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function uploadImage() {
//   const form = new FormData();
//   form.append("file", "logo.png");

//   const options = {
//     method: "POST",
//     url: "https://api.nftport.xyz/v0/files",
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: process.env.NFTPORT_KEY,
//       "content-type":
//         "multipart/form-data; boundary=---011000010111000001101001",
//     },
//     data: "[form]",
//   };

//   axios
//     .request(options)
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// }