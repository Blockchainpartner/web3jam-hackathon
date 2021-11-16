import React from "react";
import useScoring, {
  BonusScoreCriteria,
  BonusScoreCriteriaDetails,
  ScoreCriteria,
  ScoreCriteriaIcon,
  ScoreCriteriaLabels,
} from "../contexts/scoringContext";
import { BiInfoCircle } from "react-icons/bi";
import Meter from "./Meter";

function baseScoringTiles() {
  const context = useScoring();
  const { scoring, scoringValues } = context;
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4">
      <div className="box col-span-1 row-span-2 px-8 py-6">
        <span className="flex items-center">
          <p className="font-medium text-gtxt mr-2">{"Your Score"}</p>
          <BiInfoCircle className="text-gtxt" />
        </span>
        <h2 className="font-extrabold text-ablack mt-2">{scoring.score}</h2>
        <Meter score={scoring.score} />
      </div>
      {Object.keys(ScoreCriteria).map((key) => {
        const positiveScore = scoring.baseScore[key] > 0;
        return (
          <div key={key} className="box flex items-start gap-4 relative">
            <div className="w-1/4 h-full bg-gray-300 rounded flex items-center justify-center">
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
  const { scoring, scoringValues } = context;
  return (
    <div className="grid grid-rows-1 grid-cols-4 gap-4">
      {Object.keys(scoring.protocolScore).map((key) => (
        <div key={key} className="box">
          <img
            src={`/banners/${key}.png`}
            alt={key}
            className="rounded object-cover h-36"
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
}

const Scoring = () => {
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
