"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// Sample data of farmers in each LGA
const data = [
  { name: "Birnin Gwari", value: 1500 },
  { name: "Chikun", value: 1200 },
  { name: "Giwa", value: 800 },
  { name: "Igabi", value: 1000 },
  { name: "Ikara", value: 950 },
  { name: "Jaba", value: 1100 },
];

// Function to generate a color based on index
const generateColor = (index: number): string => {
  const hue = (index * 137.508) % 360; // Use golden angle approximation
  return `hsl(${hue}, 70%, 50%)`;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="font-bold">{payload[0].name}</p>
        <p>Farmers: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

interface Props {
  stats: any;
}

export default function FarmersLGAChart({ stats }: Props): JSX.Element {
  const lgaData = React.useMemo(() => {
    const lga = Object.entries(stats?.lgaStats || {}).map(([key, value]) => ({
      name: key,
      value: (value as any).total,
    }));

    return lga;
  }, [stats]);
  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Farmers Distribution by LGA</h2>
        <p className="text-sm text-gray-500">
          Number of farmers in each Local Government Area
        </p>
      </div>
      <div className="p-4">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={lgaData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {lgaData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    // fill={COLORS[index % COLORS.length]}
                    fill={generateColor(index)}
                  />
                ))}
              </Pie>

              {/* <div className="max-h-full overflow-y-auto"> */}
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value, entry: any) => (
                  <span style={{ color: entry.color }}>
                    {value}: {entry.payload.value}
                  </span>
                )}
              />
              {/* </div> */}
              {/* <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value, entry: any) => (
                  <span style={{ color: entry.color }}>
                    {value}: {entry.payload.value}
                  </span>
                )}
              /> */}
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* <div className="mt-4 flex flex-wrap justify-center gap-4">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div
                className="mr-2 h-3 w-3"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm">
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
