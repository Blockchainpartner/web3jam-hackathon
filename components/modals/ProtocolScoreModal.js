import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
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
            <div className="modal w-1/3 px-8 py-6 m-auto">
              <h6 className="font-semibold mb-4">{"Score Improvement"}</h6>
              <button
                type="button"
                className="btn mt-4"
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
