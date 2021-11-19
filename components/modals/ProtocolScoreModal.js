import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import {
  BonusScoreCriteria,
  BonusScoreCriteriaDetails,
} from "../../contexts/scoringContext";
import ClientOnlyPortal from "../ClientOnlyPortal";

export default function ProtocolScoreModal() {
  const [open, setOpen] = useState();

  const context = useWeb3React();
  const { connector, activate } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <>
      <button className="btn" onClick={() => setOpen(true)}>
        <BsQuestionCircle />
        <p className="ml-2">{"How to Improve Score"}</p>
      </button>
      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className="backdrop flex items-center justify-center">
            <div className="modal w-1/3 px-8 py-6 m-auto mb-4">
              <h6 className="font-semibold">{"Score Improvement"}</h6>
              <p className="text-gtxt mb-4">
                {
                  "To improve your bonus score you need to have interactions or assets from various protocols"
                }
              </p>
              <div className="flex flex-col gap-4 mb-6">
                {Object.keys(BonusScoreCriteria).map((key) => (
                  <div
                    key={key}
                    className="flex items-center border border-gray-300 rounded p-4"
                  >
                    <img
                      src={`/icons/${key}.png`}
                      alt={key}
                      className="rounded w-1/12"
                    />
                    <div className="ml-4">
                      <p className="font-semibold">{BonusScoreCriteria[key]}</p>
                      <p className="text-sm text-gtxt">
                        {BonusScoreCriteriaDetails[key]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn mt-4 w-full"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </ClientOnlyPortal>
      )}
    </>
  );
}
