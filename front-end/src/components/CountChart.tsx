"use client";
import Image from "next/image";
import { FaFemale, FaMale } from "react-icons/fa";
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: "Total",
    count: 106,
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 53,
    fill: "#C3EBFA",
  },
];

const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
      <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey="count"
          />
          {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} /> */}
        </RadialBarChart>
      </ResponsiveContainer>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="flex"><FaMale size={40} color="#C3EBFA"/><FaFemale size={40} color="#FAE27C"/></span>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center items-center gap-16 lg:-mt-5 xl:-mt-2">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-berhanSky rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Boys (55%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-berhanYellow rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;