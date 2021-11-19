import Tech from "../components/Tech";
import Landing from "../components/Landing";
import { useWeb3React } from "@web3-react/core";
import Scoring from "../components/Scoring";

export default function Home() {
  const context = useWeb3React();
  const { active } = context;
  return (
    <div className="flex flex-col justify-center">
      {active ? (
        <Scoring />
      ) : (
        <div className="flex flex-col justify-center">
          <Landing />
          <Tech />
        </div>
      )}
    </div>
  );
}