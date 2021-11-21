import React, { useEffect } from "react";
import useScoring, {
  BonusScoreCriteria,
  BonusScoreCriteriaDetails,
  ScoreCriteria,
  ScoreCriteriaIcon,
  ScoreCriteriaLabels,
} from "../contexts/scoringContext";
import { BiInfoCircle } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { RiExternalLinkFill } from "react-icons/ri";
import Meter from "./Meter";
import ProtocolScoreModal from "./modals/ProtocolScoreModal";
import useNftContext from "../contexts/nftContext";
import { useWeb3React } from "@web3-react/core";
import NftModal from "./modals/NftModal";
import Link from "next/link";

function baseScoringTiles() {
  const context = useScoring();
  const { scoring, scoringValues, loaded } = context;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-2 gap-4">
      <div className="box md:col-span-2 lg:col-span-3 xl:col-span-1 xl:row-span-2 px-8 py-6">
        <span className="flex items-center">
          <p className="font-medium text-gtxt mr-2">{"Your Score"}</p>
          <BiInfoCircle className="text-gtxt" />
        </span>
        <h2
          className={`font-extrabold text-ablack mt-2 ${
            loaded ? "" : "animate-pulse opacity-50"
          }`}
        >
          {scoring.score}
        </h2>
        <Meter score={scoring.score} loaded />
      </div>
      {Object.keys(ScoreCriteria).map((key) => {
        const positiveScore = scoring.baseScore[key] >= 0;
        return (
          <div key={key} className="box flex items-start gap-4 relative">
            <div
              className={`w-1/4 h-full bg-gray-300 rounded flex items-center justify-center ${
                loaded ? "" : "animate-pulse"
              }`}
            >
              {ScoreCriteriaIcon(key)}
            </div>
            <div>
              <p className="font-semibold">{ScoreCriteria[key]}</p>
              <p className="text-sm">{`${scoringValues.baseScore[key]} ${ScoreCriteriaLabels[key]}`}</p>
            </div>
            <p
              className={`absolute bottom-3 right-3 font-semibold text-2xl ${
                positiveScore ? "text-success" : "text-danger"
              }`}
            >{`${positiveScore ? "+" : ""}${scoring.baseScore[key]}`}</p>
          </div>
        );
      })}
    </div>
  );
}

function bonusScoringTiles() {
  const context = useScoring();
  const { scoring, scoringValues, loaded } = context;
  const displayCondition = Object.keys(scoring.protocolScore).some(
    (key) => scoring.protocolScore[key] > 0
  );
  if (!loaded) {
    return (
      <div className="w-full mt-4 flex items-center justify-center">
        <div className="donutSpinner" />
      </div>
    );
  } else {
    if (displayCondition) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Object.keys(scoring.protocolScore)
            .filter((key) => scoring.protocolScore[key] > 0)
            .map((key) => (
              <div key={key} className="box">
                <img
                  src={`/banners/${key}.png`}
                  alt={key}
                  className="rounded object-cover h-36 w-full"
                />
                <div className="mt-4">
                  <p className="font-semibold">{BonusScoreCriteria[key]}</p>
                  <p className="text-sm font-medium">
                    {BonusScoreCriteriaDetails[key]}
                  </p>
                  <span className="flex items-center justify-between">
                    <p className="text-sm font-light mt-1">
                      {scoringValues.protocolScore[key]}
                    </p>
                    <p className="font-semibold text-2xl text-success">{`+${scoring.protocolScore[key]}`}</p>
                  </span>
                </div>
              </div>
            ))}
        </div>
      );
    } else {
      return (
        <div className="box flex items-center justify-between w-full mt-8">
          <div>
            <p className="text font-semibold">{"No match with any protocol"}</p>
            <p className="text-sm font-light">
              {"You don't fit in any protocol based scoring criteria"}
            </p>
          </div>
          <ProtocolScoreModal />
        </div>
      );
    }
  }
}

function mintNftButton() {
  const web3Context = useWeb3React();
  const scoringContext = useScoring();
  const nftContext = useNftContext();

  const { account } = web3Context;
  const { scoring, loaded } = scoringContext;
  const { mintNftFromScore, loading } = nftContext;

  return (
    <button
      className="btn flex items-center justify-between disabled:cursor-not-allowed disabled:opacity-30"
      disabled={!loaded || loading}
      onClick={() => mintNftFromScore(account, scoring)}
    >
      {loading ? <div className="donutSpinner h-4 w-4" /> : <BsStars />}
      <p className="ml-2">
        {loading ? "Minting Score NFT ..." : "Mint your Score NFT"}
      </p>
    </button>
  );
}

function seeNftButton(nftId) {
  return (
    <a
      className="btn flex items-center justify-between disabled:cursor-not-allowed disabled:opacity-30"
      target="_blank"
      href={`https://rinkeby.etherscan.io/token/0xa368eeb3da7148158771982d793825e9b553429d?a=${nftId}`}
    >
      <RiExternalLinkFill />
      <p className="ml-2">{`NFT ID: ${nftId}`}</p>
    </a>
  );
}

const Scoring = () => {
  const nftContext = useNftContext();
  const { nftId } = nftContext;
  return (
    <div className="w-full xl:w-5/6 m-auto my-16">
      <div className="flex justify-between items-start">
        <div className="flex flex-col items-start">
          <h4 className="font-bold">{"Scoring Dashboard"}</h4>
          <p className="font-semibold text-sm text-subtxt">
            {
              "You can analyze your activity score and mint an NFT to access advantages"
            }
          </p>
        </div>
        {nftId ? seeNftButton(nftId) : mintNftButton()}
      </div>
      <div className="mt-10">
        <div className="flex flex-col items-start">
          <h6 className="font-semibold">{"Base Scoring"}</h6>
          <p className="font-medium text-sm text-subtxt">
            {"The score base that analyzes general criteria"}
          </p>
        </div>
        <div className="mt-6">{baseScoringTiles()}</div>
      </div>
      <div className="mt-10">
        <div className="flex flex-col items-start">
          <h6 className="font-semibold">{"Bonus Scoring"}</h6>
          <p className="font-medium text-sm text-subtxt">
            {"Score bonuses based on protocol-specific criteria"}
          </p>
        </div>
        <div className="mt-6">{bonusScoringTiles()}</div>
      </div>
    </div>
  );
};

export default Scoring;
