import { useState } from "react";
import ClientOnlyPortal from "../ClientOnlyPortal";

export default function WalletsModal() {
  const [open, setOpen] = useState();

  return (
    <>
      <button className="btn" onClick={() => setOpen(true)}>
        {"Connect Wallet"}
      </button>
      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className="backdrop">
            <div className="modal w-1/6 h-36 px-8 py-6 m-auto">
              <div className="flex flex-col">
                <button className="border border-orange-500">hi</button>
                <button type="button" onClick={() => setOpen(false)}>
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
