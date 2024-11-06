"use client"

import Image from 'next/image';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: "Class 1",
      male: 40,
      female: 35,
    },
    {
      name: "Class 2",
      male: 30,
      female: 25,
    },
    {
      name: "Class 3",
      male: 35,
      female: 40,
    },
    {
      name: "Class 4",
      male: 45,
      female: 42,
    },
    {
      name: "Class 5",
      male: 25,
      female: 30,
    },
  ];

const TotalClass = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Total Students in each class</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={16}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd'/>
          <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
          <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
          <Tooltip contentStyle={{borderRadius:"10px", borderColor: "lightgray"}} />
          <Legend align='left' verticalAlign='top' wrapperStyle={{paddingTop:'20px', paddingBottom:'40px'}} />
          <Bar dataKey="male" fill="#00ADEF" radius={[6, 6, 0, 0]} legendType='circle' />
          <Bar dataKey="female" fill="#CFCEFF" radius={[6, 6, 0, 0]} legendType='circle' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalClass;