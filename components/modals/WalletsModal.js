import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { connectorsByName } from "../../utils/connectors";
import ClientOnlyPortal from "../ClientOnlyPortal";

export default function WalletsModal() {
  const [open, setOpen] = useState();

  const context = useWeb3React();
  const {
    connector,
    activate,
  } = context;

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
        {"Connect Wallet"}
      </button>
      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className="backdrop flex items-center justify-center">
            <div className="modal w-1/6 px-8 py-6 m-auto">
              <h6 className="font-semibold mb-4">{"Select a Provider"}</h6>
              <div className="flex flex-col gap-2">
                <div
                  className="border border-mm p-3 flex items-center justify-between rounded cursor-pointer hover:bg-mm-100"
                  onClick={() => {
                    setActivatingConnector(connectorsByName.Injected);
                    activate(connectorsByName.Injected);
                  }}
                >
                  <span className="flex items-center justify-start">
                    <img
                      src="/icons/metamask.svg"
                      alt="Metamask"
                      className="rounded-full h-6 w-6"
                    />
                    <p className="ml-3 font-semibold">{"Metamask"}</p>
                  </span>
                  {connectorsByName.Injected === activatingConnector ? (
                    <div className="donutSpinner smallSpinner" />
                  ) : null}
                </div>
                <div
                  className="border border-blue-500 p-3 flex items-center justify-between rounded cursor-pointer hover:bg-blue-100"
                  onClick={() => {
                    setActivatingConnector(connectorsByName.WalletConnect);
                    activate(connectorsByName.WalletConnect);
                  }}
                >
                  <span className="flex items-center justify-start">
                    <img
                      src="/icons/walletConnect.png"
                      alt="WalletConnect"
                      className="rounded-full h-6 w-6"
                    />
                    <p className="ml-3 font-semibold">{"Wallet Connect"}</p>
                  </span>
                  {connectorsByName.WalletConnect === activatingConnector ? (
                    <div className="donutSpinner smallSpinner" />
                  ) : null}
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
