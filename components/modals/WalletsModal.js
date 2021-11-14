import { useState } from "react";
import useWeb3Ctx from "../../contexts/web3Context";
import ClientOnlyPortal from "../ClientOnlyPortal";

export default function WalletsModal() {
  const [open, setOpen] = useState();

  const { requestAccess } = useWeb3Ctx();

  return (
    <>
      <button className="btn" onClick={() => setOpen(true)}>
        {"Connect Wallet"}
      </button>
      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className="backdrop flex items-center justify-center">
            <div className="modal w-1/6 px-8 py-6 m-auto">
              <h6 className="font-semibold mb-4">{"Select a Provider"}</h6>
              <div className="flex flex-col gap-2">
                <div
                  className="border border-mm p-3 flex items-center rounded cursor-pointer hover:bg-mm-100"
                  onClick={requestAccess}
                >
                  <img
                    src="/icons/metamask.svg"
                    alt="Metamask"
                    className="rounded-full h-6 w-6"
                  />
                  <p className="ml-3 font-semibold">{"Metamask"}</p>
                </div>
                <div className="border border-blue-500 p-3 flex items-center rounded cursor-pointer hover:bg-blue-100">
                  <img
                    src="/icons/walletConnect.png"
                    alt="WalletConnect"
                    className="rounded-full h-6 w-6"
                  />
                  <p className="ml-3 font-semibold">{"Wallet Connect"}</p>
                </div>
                <button
                  type="button"
                  className="btn mt-4"
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
