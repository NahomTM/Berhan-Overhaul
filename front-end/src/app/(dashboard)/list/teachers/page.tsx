"use client";

import { useState } from "react";
import { createColumns } from "./columns";
import { DataTable } from "@/components/dataTable"; // Adjust the import accordingly
import FormModal from "@/components/FormModal"; // Import your modal component
import { teachersData } from "@/lib/data"; // Ensure correct import for User type
import { FiPlusCircle } from "react-icons/fi";

const TeachersListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherIdToDelete, setTeacherIdToDelete] = useState<number | null>(null);

  const data = teachersData;

  const handleDelete = (id: number) => {
    setTeacherIdToDelete(id);
    setIsModalOpen(true); // Open the modal when delete is triggered
  };

  const openCreate = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setTeacherIdToDelete(null);
  };

  const handleConfirmDelete = () => {
    // Implement your deletion logic here (e.g., API call)
    console.log(`Deleting teacher with ID: ${teacherIdToDelete}`);
    closeModal(); // Close modal after deletion
  };

  // Get columns with the handleDelete function passed in
  const columns = createColumns(handleDelete);

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
          <FiPlusCircle size={60} stroke="white" fill="orange" onClick ={() => {openCreate()}} />
        </div>
      </div>

      {isModalOpen && teacherIdToDelete !== null && (
        <FormModal
          table="teacher"
          type="delete"
          id={teacherIdToDelete}
          onClose={closeModal} // Pass the closeModal function
          onConfirmDelete={handleConfirmDelete} // Pass the confirm handler
        />
      )}
      {isModalOpen && (<FormModal
                  table="teacher"
                  type="create"
                  onClose={closeModal}
                />)}
    </div>
  );
};

export default TeachersListPage;