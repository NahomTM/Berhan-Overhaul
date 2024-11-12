"use client";

import { useState } from "react";
import { createColumns } from "./columns";
import { DataTable } from "@/components/dataTable"; // Adjust the import accordingly
import FormModal from "@/components/FormModal"; // Import your modal component
import { studentsData } from "@/lib/data"; // Ensure correct import for User type
import { FiPlusCircle } from "react-icons/fi";

const StudentsListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState<number | null>(null);
  const [studentIdToUpdate, setStudentIdToUpdate] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const data = studentsData;

  const handleDelete = (id: number) => {
    setStudentIdToDelete(id);
    setIsModalOpen(true); // Open the modal when delete is triggered
  };

  const handleUpdate = (id: number) => {
    const studentToUpdate = studentsData.find(student => student.id === id);
    if (studentToUpdate) {
      const [firstName = "", lastName = ""] = studentToUpdate.name.split(" ");
      const formattedStudent = {
        ...studentToUpdate,
        firstName,
        lastName,
        birthDate: studentToUpdate.birthday,
      };
      setSelectedStudent(formattedStudent);
      setStudentIdToUpdate(id);
      setIsModalOpen(true); // Open modal with pre-filled data for updating
    }
  };

  const openCreate = () => {
    setStudentIdToUpdate(null);
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStudentIdToDelete(null);
    setStudentIdToUpdate(null);
    setSelectedStudent(null);
  };

  const handleConfirmDelete = () => {
    // Implement your deletion logic here (e.g., API call)
    console.log(`Deleting student with ID: ${studentIdToDelete}`);
    closeModal(); // Close modal after deletion
  };

  // Get columns with the handleDelete and handleUpdate functions passed in
  const columns = createColumns(handleDelete, handleUpdate);

  return (
    <div className="relative">
      <section className="flex flex-col h-full">
        <div className="container w-[96%] mx-auto py-4 flex-grow overflow-auto">
          <div className="mb-4 font-semibold text-2xl">Students</div>
          <div className="border-2 rounded-md">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </section>
      
      {/* Fixed Plus Circle Icon */}
      <div className="fixed right-20 bottom-12 bg-none">
        <div className="pulse">
          <FiPlusCircle size={60} stroke="white" fill="orange" onClick={openCreate} />
        </div>
      </div>

      {isModalOpen && studentIdToDelete !== null && (
        <FormModal
          table="student"
          type="delete"
          id={studentIdToDelete}
          onClose={closeModal}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
      {isModalOpen && studentIdToUpdate !== null && (
        <FormModal
          table="student"
          type="update"
          id={studentIdToUpdate}
          onClose={closeModal}
          data={selectedStudent} // Pass the formatted student data for update
        />
      )}
      {isModalOpen && studentIdToUpdate === null && (
        <FormModal
          table="student"
          type="create"
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default StudentsListPage;
