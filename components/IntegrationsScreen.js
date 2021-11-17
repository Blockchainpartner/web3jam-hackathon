import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { getLorem } from "../utils/utils";

function getScoreTile() {
  const code =
    '<button className="btn flex items-center">\n<img src="/logo-icon-white.png" alt="dyFactor" className="mr-2 h-4" />\n{"Access with dyFactor Score"}\n</button>';
  return (
    <div className="box">
      {/* <p className="font-semibold">{"Example"}</p> */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <SyntaxHighlighter language="js">{code}</SyntaxHighlighter>
        </div>
        <div className="bg-white relative p-4 rounded pb-16">
          <div>
            <p className="font-semibold text-lg font-serif">{"Web3 Times"}</p>
            <p className="text-sm mt-2 font-serif">{getLorem()}</p>
          </div>
          <div className="fade rounded" />
          <div className="absolute bottom-0 py-6 flex items-center justify-center w-full right-0 left-0 bg-white rounded">
            <button className="btn flex items-center">
              <img
                src="/logo-icon-white.png"
                alt="dyFactor"
                className="mr-2 h-4"
              />
              {"Access with dyFactor Score"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const IntegrationsScreen = () => {
  return (
    <div className="w-full xl:w-5/6 m-auto my-16">
      <div className="flex justify-between items-start">
        <div className="flex flex-col items-start">
          <h4 className="font-bold">{"Code Integrations"}</h4>
          <p className="font-semibold text-sm text-subtxt">
            {
              "You can analyze your activity score and mint an NFT to access advantages"
            }
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex flex-col items-start">
          <h6 className="font-semibold">{"Get Score Button"}</h6>
          <p className="font-medium text-sm text-subtxt">
            {
              "Integrate this button in your app to get a user to sumbit their score and use it"
            }
          </p>
        </div>
        <div className="mt-6">{getScoreTile()}</div>
      </div>
    </div>
  );
};

export default IntegrationsScreen;
