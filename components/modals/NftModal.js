import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import useNft from "../../contexts/nftContext";
import ClientOnlyPortal from "../ClientOnlyPortal";

export default function NftModal() {
  const [open, setOpen] = useState();

  const nftContext = useNft();
  const { nft } = nftContext;

  return (
    <>
      <button className="btn" onClick={() => setOpen(true)}>
        <BsFillEyeFill className="text-white" />
        <p className="ml-2">{`NFT ID: ${nft}`}</p>
      </button>
      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className="backdrop flex items-center justify-center">
            <div className="modal w-1/4 m-auto mb-4 p-0.5 bg-gradient-to-r from-brand1 to-brand2">
              <div className="bg-white px-8 py-6 rounded">
                <h6 className="font-semibold">{"Your Score NFT"}</h6>
                {/* <p className="text-gtxt mb-4">
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
                        <p className="font-semibold">
                          {BonusScoreCriteria[key]}
                        </p>
                        <p className="text-sm text-gtxt">
                          {BonusScoreCriteriaDetails[key]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div> */}
                <button
                  type="button"
                  className="btn mt-4 w-full"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </ClientOnlyPortal>
      )}
    </>
  );
}
