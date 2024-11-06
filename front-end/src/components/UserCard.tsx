import Image from "next/image";
import { FaCalendar, FaRegCalendarAlt } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi"; // Student icon
import { PiChalkboardTeacherBold } from "react-icons/pi"; // Teacher icon (replace with actual import)
import { RiParentLine } from "react-icons/ri"; // Parent icon (replace with actual import)

const UserCard = ({ type }: { type: string }) => {
  // Determine the icon based on type
  const renderIcon = () => {
    switch (type) {
      case "student":
        return (
          <div className="bg-red-100 w-8 h-8 px-[6.5px] py-[6.5px] rounded-md">
            <PiStudentBold size={20} className="text-red-600" />
          </div>
        );
      case "teacher":
        return (
          <div className="bg-green-100 w-8 h-8 px-[6.5px] py-[6.5px] rounded-md">
            <PiChalkboardTeacherBold size={20} className="text-green-600" />
          </div>
        ); // Example color for teacher
      case "parent":
        return (
          <div className="bg-orange-100 w-8 h-8 px-[6.5px] py-[6.5px] rounded-md">
            <RiParentLine size={20} className="text-orange-600" />
          </div>
        ); // Example color for parent
      default:
        return null; // Fallback if type doesn't match
    }
  };
  const renderDescription = () => {
    switch (type) {
      case "student":
        return (
          <div className="ml-2 w-[215px] h-20 mt-1 px-2 py-3 rounded-lg bg-red-50 text-red-600">
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold">1,234</h1>
              <div className="flex px-2 gap-1">
                <FaRegCalendarAlt className="mt-1" />
                <span className="text-xs font-semibold">2024</span>
              </div>
            </div>
            <div className="py-3 flex">
              <span className="text-sm text-gray-800 font-semibold">15% more than last year</span>
              <FaArrowTrendUp size={22} className="ml-[5px]" />
            </div>
          </div>
        );
      case "teacher":
        return (
          <div className="ml-2 w-[215px] h-20 mt-1 px-2 py-3 rounded-lg bg-green-50 text-green-600">
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold">1,234</h1>
              <div className="flex px-2 gap-1">
                <FaRegCalendarAlt className="mt-1" />
                <span className="text-xs font-semibold">2024</span>
              </div>
            </div>
            <div className="py-3 flex">
              <span className="text-sm text-gray-800 font-semibold">15% more than last year</span>
              <FaArrowTrendUp size={22} className="ml-[5px]" />
            </div>
          </div>
        );
      case "parent":
        return (
          <div className="ml-2 w-[215px] h-20 mt-1 px-2 py-3 rounded-lg bg-orange-50 text-orange-600">
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold">1,234</h1>
              <div className="flex px-2 gap-1">
                <FaRegCalendarAlt className="mt-1" />
                <span className="text-xs font-semibold">2024</span>
              </div>
            </div>
            <div className="py-3 flex">
              <span className="text-sm text-gray-800 font-semibold">15% more than last year</span>
              <FaArrowTrendUp size={22} className="ml-[5px]" />
            </div>
          </div>
        );
      default:
        return null; // Fallback if type doesn't match
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-custom cursor-pointer p-4 flex-1 min-w-[130px]">
      <div className="flex items-center">
        <span className="px-2 py-2 rounded-full">{renderIcon()}</span>
        <h2 className="capitalize text-lg font-medium text-gray-700">
          {type}s
        </h2>
      </div>
      <div>{renderDescription()}</div>
    </div>
  );
};

export default UserCard;
