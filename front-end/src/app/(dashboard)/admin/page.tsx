import UserCard from "@/components/UserCard";
import CountChart from "@/components/CountChart";
import TotalClass from "@/components/TotalClass";
import TeacherStudent from "@/components/TeacherStudent";
import Event from "@/components/Event";
import Announcements from "@/components/Announcement";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

function getCurrentWeekRange(): string {
  const today = new Date();
  const currentDay = today.getDay();

  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Sunday is treated as day 0
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + mondayOffset);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };

  return `${startOfWeek.toLocaleDateString('en-US', options)} - ${endOfWeek.toLocaleDateString('en-US', options)}`;
}

const AdminPage = () => {
  const weekRange = getCurrentWeekRange();
  const Activities = [
    {
      id: 101,
      dateTime: "2024-11-01 09:35 AM",
      photo:
      "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
      user: "John Smith",
      type: "Enrollment",
      details: "Student enrolled in Math 101",
      entity: "Math 101 Class",
    },
    {
      id: 102,
      dateTime: "2024-11-02 11:50 AM",
      user: "Mary Jones",
      photo:
      "https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=1200",
      type: "Teacher Assignment",
      details: "Teacher assigned to Science 201",
      entity: "Science 201 Class",
    },
    {
      id: 103,
      dateTime: "2024-11-02 02:15 PM",
      user: "Jay French",
      photo:
      "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
      type: "Class Creation",
      details: "Created a new class: Art 101",
      entity: "Art 101",
    },
    {
      id: 104,
      dateTime: "2024-11-03 10:00 AM",
      user: "Mike Geller",
      photo: "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1200",
      type: "Student Update",
      details: "Updated student profile for Jane Doe",
      entity: "Student Database",
    },
    {
      id: 105,
      dateTime: "2024-11-04 08:45 AM",
      user: "Tom Lee",
      photo:
      "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1200",
      type: "Class Removal",
      details: "Removed History 101",
      entity: "History 101 Class",
    },
    {
      id: 106,
      dateTime: "2024-11-05 12:30 PM",
      user: "Lisa Ray",
      photo:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
      type: "Enrollment",
      details: "Student enrolled in Science 201",
      entity: "Science 201 Class",
    },
  ];
  return (
    <div className="p-4 -mt-2 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="w-full h-[430px] shadow-custom rounded-xl">
          <TeacherStudent />
        </div>
        {/* BOTTOM CHART */}
        <div className="flex gap-4 flex-col lg:flex-row bg-white shadow-custom p-4 rounded-lg">
          <div className="w-full">
          <div className="mb-2 bg-orange-400 py-2 px-3 rounded-md flex justify-between">
            <span className="text-white text-pretty font-semibold">Recent Activities</span>
            <div className="flex gap-2">
              <FaCalendarAlt color="white" className="mt-1"/>
              <span className="text-white text-pretty font-normal">{weekRange}</span>
            </div>  
          </div>
          <div></div>
          <Table>
            <TableHeader className="bg-orange-50">
              <TableRow className="text-base font-normal">
                <TableHead>id</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Activities.map((activity) => (
                <TableRow key={activity.id} className="bg-white">
                  <TableCell className="font-medium">
                    {activity.id}
                  </TableCell>
                  <TableCell className="flex gap-3"> <Image src={activity.photo} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover"/><span className="text-md mt-2 font-semibold">{activity.user}</span></TableCell>
                  <TableCell>{activity.details}</TableCell>
                  <TableCell>{activity.dateTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8 shadow-custom rounded-xl">
        <Event />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
