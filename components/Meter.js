import React from "react";
import { scoreMark } from "../contexts/scoringContext";

const Meter = ({ score, loaded }) => {
  return (
    <div className="mt-6">
      <p className="text-gtxt">{scoreMark(score)}</p>
      <div className="flex items-end justify-between w-full mb-1">
        <p className="text-subtxt text-xs">0</p>
        <p className="text-subtxt text-xs">1000</p>
      </div>
      <div
        className={`w-full rounded h-2 bg-white flex items-center justify-start ${
          loaded ? "" : "animate-pulse"
        }`}
      >
        <div
          className="rounded h-2 bg-gradient-to-r from-brand1 to-brand2"
          style={{ width: `${score / 10}%` }}
        />
      </div>
    </div>
  );
};

export default Meter;
