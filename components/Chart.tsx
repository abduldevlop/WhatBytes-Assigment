import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  ReferenceLine,
  TooltipProps,
} from "recharts";
import grap from "@/assets/graph.png";

// Define the type for the chart data
interface DataPoint {
  percentile: number;
  student: number;
}

const data: DataPoint[] = [
  { percentile: 0, student: 2 },
  { percentile: 10, student: 6 },
  { percentile: 20, student: 7 },
  { percentile: 30, student: 20 },
  { percentile: 40, student: 15 },
  { percentile: 50, student: 25 },
  { percentile: 60, student: 30 },
  { percentile: 70, student: 20 },
  { percentile: 80, student: 15 },
  { percentile: 90, student: 4 },
  { percentile: 100, student: 1 },
];

const CustomTooltip = ({ active, payload }: TooltipProps<number, number>) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <p className="font-bold">{`${payload[0].payload.percentile}`}</p>
        <p className="text-blue-800 text-sm">{`numberOfStudents: ${payload[0].payload.student}`}</p>
      </div>
    );
  }
  return null;
};
const Chart = () => {
  return (
    <div className="mt-10  border border-[#E7EBEF] px-5 py-5 mr-10 rounded-md ">
      <div className="flex gap-2 mb-5">
        <div>
          <h1 className="font-bold">Comparison Graph</h1>
          <p className="text-sm mt-2 text-[#5c5b5b]">
            <span className="font-bold ">You scored 30% percentile</span> which
            is lower than the <br /> average percentile 72% of all the engineers
            who took this assessment
          </p>
        </div>
        <div className="bg-[#F3F6F7]  h-10 p-3 rounded-full w-fit ">
          <Image src={grap} alt="graph" className="w-5" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          {/* X-Axis for Percentiles */}
          <XAxis
            dataKey="percentile"
            type="number"
            domain={[0, 100]}
            label={{
              position: "insideBottomRight",
              offset: -5,
            }}
          />

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Line to connect the points */}
          <Line
            type="monotone"
            dataKey="student"
            stroke="#8884d8"
            dot={true} // Show default dots
          />

          {/* Highlight the 90th percentile point */}
          <Scatter
            data={[{ percentile: 90, student: 4 }]}
            fill="#8884d8"
            shape="circle"
            r={8} // Larger radius for the 90th percentile
          />

          {/* Reference line for 'Your Percentile' */}
          <ReferenceLine
            x={30}
            stroke="gray"
            label={{ position: "centerTop", value: "your percentile" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
