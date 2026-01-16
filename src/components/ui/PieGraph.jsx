"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "A", value: 55 },
  { name: "B", value: 12 },
  { name: "C", value: 8 },
  { name: "D", value: 25 },
];

const COLORS = ["#3b82f6", "#22c55e", "#a855f7", "#eab308"];

// Custom label function to place percentage **inside slice**
const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  // radius at middle of slice
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
    className="text-[9px] xl:text-xs"
      x={x}
      y={y}
      fill="#fff" // white text to show on colored slice
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

const SinglePieChart = () => {
  return (
    <div className="w-full h-40 bg-white rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="40%"
            cy="40%"
            innerRadius={35}
            outerRadius={65 }
            paddingAngle={2}
            label={renderLabel} // <-- show percentage inside slice
            labelLine={false} // no lines
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SinglePieChart;
