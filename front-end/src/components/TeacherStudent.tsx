"use client";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", students: 110, teachers: 30, ratio: (110 / 30).toFixed(2) },
  { name: "Feb", students: 150, teachers: 52, ratio: (150 / 52).toFixed(2) },
  { name: "Mar", students: 70, teachers: 23, ratio: (70 / 23).toFixed(2) },
  { name: "Apr", students: 200, teachers: 44, ratio: (200 / 44).toFixed(2) },
  { name: "May", students: 130, teachers: 74, ratio: (130 / 74).toFixed(2) },
  { name: "Jun", students: 260, teachers: 35, ratio: (260 / 35).toFixed(2) },
  { name: "Jul", students: 80, teachers: 26, ratio: (80 / 26).toFixed(2) },
  { name: "Aug", students: 200, teachers: 17, ratio: (200 / 17).toFixed(2) },
  { name: "Sep", students: 120, teachers: 27, ratio: (120 / 27).toFixed(2) },
  { name: "Oct", students: 240, teachers: 28, ratio: (240 / 28).toFixed(2) },
  { name: "Nov", students: 250, teachers: 48, ratio: (250 / 48).toFixed(2) },
  { name: "Dec", students: 170, teachers: 29, ratio: (170 / 29).toFixed(2) },
];

const TeacherStudent = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          Enrollment Trends and Teacher-Student Ratio
        </h1>
        {/* <div className="mr-6 flex gap-2">
          <FaCalendarAlt size={22} className="text-orange-500"/>
          <span className="text-base font-semibold text-gray-500">2024</span>
        </div> */}
      </div>
      <div>
        
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd"/>
          <XAxis dataKey="name" tickMargin={10} axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} />
          <YAxis axisLine={false} tickMargin={10} tick={{fill:"#d1d5db"}} tickLine={false}/>
          <Tooltip />
          <Legend align='center' verticalAlign='top' wrapperStyle={{paddingTop:'10px', paddingBottom:'30px'}}/>

          <Line type="monotone" dataKey="students" stroke="red" strokeWidth={3} />

          <Line type="monotone" dataKey="teachers" stroke="orange" strokeWidth={3} />

          <Line
            type="monotone"
            dataKey="ratio"
            stroke="pink"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeacherStudent;
