"use client";

import { useState } from "react";
import { createColumns } from "./columns";
import { DataTable } from "@/components/dataTable"; // Adjust the import accordingly
import FormModal from "@/components/FormModal"; // Import your modal component
import { employeesData } from "@/lib/data"; // Ensure correct import for User type
import { FiPlusCircle } from "react-icons/fi";

const EmployeesListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeIdToDelete, setTeacherIdToDelete] = useState<number | null>(null);
  const [employeeIdToUpdate, setTeacherIdToUpdate] = useState<number | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

  const data = employeesData;

  const handleDelete = (id: number) => {
    setTeacherIdToDelete(id);
    setIsModalOpen(true); // Open the modal when delete is triggered
  };

  const handleUpdate = (id: number) => {
    const employeeToUpdate = employeesData.find(employee => employee.id === id);
    if (employeeToUpdate) {
      // Split the name into firstName and lastName
      const [firstName = "", lastName = ""] = employeeToUpdate.name.split(" ");
      const formattedTeacher = {
        ...employeeToUpdate,
        firstName,
        lastName,
        // Format the date to YYYY-MM-DD for the input field
        birthday: employeeToUpdate.birthday,
      };
      setSelectedTeacher(formattedTeacher);
      setTeacherIdToUpdate(id);
      setIsModalOpen(true);
    }
  };

  const openCreate = () => {
    setTeacherIdToUpdate(null);
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setTeacherIdToDelete(null);
  };

  const handleConfirmDelete = () => {
    // Implement your deletion logic here (e.g., API call)
    console.log(`Deleting employee with ID: ${employeeIdToDelete}`);
    closeModal(); // Close modal after deletion
  };

  // Get columns with the handleDelete function passed in
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
          <FiPlusCircle size={60} stroke="white" fill="orange" onClick ={() => {openCreate()}} />
        </div>
      </div>

      {isModalOpen && employeeIdToDelete !== null && (
        <FormModal
          table="employee"
          type="delete"
          id={employeeIdToDelete}
          onClose={closeModal} // Pass the closeModal function
          onConfirmDelete={handleConfirmDelete} // Pass the confirm handler
        />
      )}
      {isModalOpen && employeeIdToUpdate !== null && (
        <FormModal
          table="employee"
          type="update"
          id={employeeIdToUpdate}
          onClose={closeModal}
          data={selectedTeacher} // Pass the formatted employee data
        />
      )}
      {isModalOpen && employeeIdToUpdate === null && (<FormModal
                  table="employee"
                  type="create"
                  onClose={closeModal}
                />)}
    </div>
  );
};

export default EmployeesListPage;