import BarChart from "@/components/BarChart";
import NetworkGraph from "@/components/NetworkGraph";
import Top from "@/components/Top";

export default function Home() {
  const data = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  return (
    <div className="flex flex-col items-center">
      <Top />
      <BarChart data={data} />
    </div>
  );
}
