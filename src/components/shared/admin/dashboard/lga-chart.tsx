"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

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

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4000 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 7000 },
];

export default function FarmersLGAChart({ stats }: Props): JSX.Element {
  const lgaData = React.useMemo(() => {
    const lga = Object.entries(stats?.lgaStats || {}).map(([key, value]) => ({
      name: key,
      value: (value as any).total,
    }));

    return lga;
  }, [stats]);
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Farmers Distribution by LGA</h2>
        <p className="text-sm text-gray-500">
          Number of farmers in each Local Government Area
        </p>
      </div>
      <div className="p-4">
        <div className="">
          {/* <ResponsiveContainer width="100%" height="100%">
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
                    fill={generateColor(index)}
                  />
                ))}
              </Pie>

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
            </PieChart>
          </ResponsiveContainer> */}

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={lgaData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis dataKey="value" />
              <Tooltip />
              <Legend layout="vertical" />
              <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                {lgaData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={generateColor(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
