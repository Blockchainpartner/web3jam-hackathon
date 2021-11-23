import React, { useState } from "react";
// import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
// import { shadesOfPurple } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { getLorem, INTEGRATION_CODE } from "../utils/utils";

const integrations = {
  unlock: {
    title: "Unlock's Memebership Access",
    details:
      "Grants special access with respect to a thereshold score defined by the lock creator",
    img: "/banners/int-unlock.jpg",
  },
  aave: {
    title: "Better lending rates on Aave's money market",
    details:
      "Grants you interesting borrowing rates with a good enough score and lending bonuses",
    img: "/banners/int-aave.jpeg",
  },
  discord: {
    title: "Discord engagement airdrop system",
    details:
      "Grants you a score to verify if you can claim an airdrop thourgh Discord or get whitelisted",
    img: "/banners/int-discord.jpg",
  },
};

function GetScoreTile() {
  const [hideContent, setHideContent] = useState(true);
  const [loading, setLoading] = useState(false);
  const fakeUnlock = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHideContent(false);
    }, 2000);
  };
  return (
    <div className="box py-6">
      {/* <p className="font-semibold">{"Example"}</p> */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2" style={{backgroundImage: "url('/mock.png')"}}/>
          {/* <SyntaxHighlighter
            language="js"
            style={shadesOfPurple}
            wrapLines
            showLineNumbers
            className="rounded px-4 py-2 text-sm"
          >
            {INTEGRATION_CODE}
          </SyntaxHighlighter> */}
        <div className="bg-white relative p-4 rounded pb-16">
          <button
            className="absolute btn text-xs disabled:cursor-not-allowed disabled:opacity-20 top-2 right-2"
            disabled={hideContent}
            onClick={() => setHideContent(true)}
          >
            {"RETRY"}
          </button>
          <div>
            <p className="font-semibold text-lg font-serif">{"Web3 Times"}</p>
            <p className="text-sm mt-2 font-serif">{getLorem()}</p>
          </div>
          {hideContent ? (
            <>
              <div className="fade rounded" />
              <div className="absolute bottom-0 py-6 flex items-center justify-center w-full right-0 left-0 bg-white rounded">
                <button className="btn flex items-center" onClick={fakeUnlock}>
                  {loading ? (
                    <div className="donutSpinner h-4 w-4 mr-2" />
                  ) : (
                    <img
                      src="/logo-icon-white.png"
                      alt="dyFactor"
                      className="mr-2 h-4"
                    />
                  )}
                  {"Access with dyFactor Score"}
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function getIntegrations() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
      {Object.keys(integrations).map((key) => (
        <div key={key} className="flex flex-col items-start cursor-not-allowed">
          <img
            src={integrations[key].img}
            alt={key}
            className="object-cover h-48 w-full"
          />
          <h6 className="font-semibold mt-2">{integrations[key].title}</h6>
          <p className="text-gtxt mt-1">{integrations[key].details}</p>
        </div>
      ))}
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
        <div className="mt-6">{GetScoreTile()}</div>
      </div>

      <div className="mt-10">
        <div className="flex flex-col items-start">
          <h6 className="font-semibold">{"Other Integration Examples"}</h6>
          <p className="font-medium text-sm text-subtxt">
            {"Multiple possible use-cases to be integrated with dyFactor"}
          </p>
        </div>
        <div className="mt-6">{getIntegrations()}</div>
      </div>
    </div>
  );
};

export default IntegrationsScreen;
