import BarChart from '@/components/BarChart';

export default function Home() {
  const data = [25, 30, 45, 60, 20, 75, 90];

  return (
    <div>
      <h1>D3.js with Next.js</h1>
      <BarChart data={data} />
    </div>
  );
}
