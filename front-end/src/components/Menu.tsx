"use client"

import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { BiMessageDots } from "react-icons/bi";
import { FaRegCalendarAlt, FaRegUserCircle } from "react-icons/fa";
import { LuFileAudio, LuListTodo } from "react-icons/lu";
import {
  MdDashboard,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
  MdOutlinePlayLesson,
} from "react-icons/md";
import {
  PiChalkboardTeacherBold,
  PiExamBold,
  PiStudentBold,
} from "react-icons/pi";
import { RiMegaphoneLine, RiParentLine } from "react-icons/ri";
import { SiAudiobookshelf, SiGoogleclassroom } from "react-icons/si";


const menuItems = [
  {
    title: "Pages",
    items: [
      {
        icon: <MdDashboard />,
        label: "Overview",
        href: `/${role}`,
        visible: ["admin", "teacher"],
      },
      {
        icon: <PiChalkboardTeacherBold />,
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin"],
      },
      {
        icon: <PiStudentBold />,
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: <SiGoogleclassroom />,
        label: "Classes",
        href: "/list/classrooms",
        visible: ["admin", "teacher"],
      },
      {
        icon: <MdOutlinePlayLesson />,
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: <PiExamBold />,
        label: "Exams",
        href: "/list/exams",
        visible: ["teacher"],
      },
      {
        icon: <LuFileAudio />,
        label: "Audiobooks",
        href: "/list/assignments",
        visible: ["teacher"],
      },
      {
        icon: <LuListTodo />,
        label: "To Do",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <BiMessageDots />,
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "User",
    items: [
      {
        icon: <FaRegUserCircle />,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <MdOutlineSettings />,
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <MdLogout />,
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  const pathname = usePathname(); // Use usePathname to get the current route

  return (
    <div className="mt-4 text-sm h-full overflow-hidden">
      <div className="flex flex-col gap-2 h-screen-minus-18 overflow-y-auto">
        {menuItems.map((i) => (
          <div className="flex flex-col gap-2" key={i.title}>
            <span className="hidden lg:block text-gray-700 font-bold text-base my-4 px-2">
              {i.title}
            </span>
            {i.items.map((item) => {
              if (item.visible.includes(role)) {
                const isActive = pathname === item.href;

                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className={`flex items-center text-pretty font-semibold justify-center lg:justify-start gap-4 text-gray-600 py-2 md:px-2 rounded-md ${
                      isActive ? "bg-orange-50 text-orange-400" : "hover:bg-orange-50 hover:text-orange-400"
                    }`}
                  >
                    <div className="text-lg text-orange-400">{item.icon}</div>
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
