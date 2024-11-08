"use client";

import { DataTable } from "@/components/dataTable";
import { FiPlusCircle } from "react-icons/fi";
import { createColumns } from "./columns";
import { coursesData } from "@/lib/data";

const CoursesListPage = () => {

    const data = coursesData;

    const handleDelete = () => {

    }
    const handleUpdate = () => {
        
    }

    const columns = createColumns(handleDelete, handleUpdate);
  return (
    <div className="relative">
      <section className="flex flex-col h-full">
        <div className="container w-[96%] mx-auto py-4 flex-grow overflow-auto">
          <div className="mb-4 font-semibold text-2xl">Teachers</div>
          <div className="border-2 rounded-md">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </section>
      
      {/* Fixed Plus Circle Icon */}
      <div className="fixed right-20 bottom-12 bg-none">
        <div className="pulse">
          <FiPlusCircle size={60} stroke="white" fill="orange" />
        </div>
      </div>
    </div>
  );
};

export default CoursesListPage;