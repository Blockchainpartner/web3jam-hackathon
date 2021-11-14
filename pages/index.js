import Tech from "../components/Tech";
import Landing from "../components/Landing";

export default function Home() {
  return (
    <div className="flex flex-col  justify-center">
      <Landing />
      <Tech />
    </div>
  );
}
