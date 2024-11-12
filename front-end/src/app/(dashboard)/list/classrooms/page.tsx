"use client";

import { useState } from "react";
import { createColumns } from "./columns";
import { DataTable } from "@/components/dataTable"; // Adjust the import accordingly
import FormModal from "@/components/FormModal"; // Import your modal component
import { classesData } from "@/lib/data"; // Ensure correct import for Classroom type
import { FiPlusCircle } from "react-icons/fi";

const ClassroomListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classroomIdToDelete, setClassroomIdToDelete] = useState<number | null>(
    null
  );
  const [classroomIdToUpdate, setClassroomIdToUpdate] = useState<number | null>(
    null
  );
  const [selectedClassroom, setSelectedClassroom] = useState<any>(null);

  const data = classesData;

  const handleDelete = (id: number) => {
    setClassroomIdToDelete(id);
    setIsModalOpen(true); // Open the modal when delete is triggered
  };

  // ClassroomListPage.tsx

  const handleUpdate = (id: number) => {
    const classroomToUpdate = classesData.find(
      (classroom) => classroom.id === id
    );
    if (classroomToUpdate) {
      const formattedClassroom = {
        ...classroomToUpdate,
        name: classroomToUpdate.name,
        subjects: classroomToUpdate.subjects || [],
      };
      setSelectedClassroom(formattedClassroom); // Pass the selected classroom data
      setClassroomIdToUpdate(id);
      setIsModalOpen(true); // Open the form modal for updating
    }
    console.log("class to update: ", classroomToUpdate);
    
  };

  const openCreate = () => {
    setClassroomIdToUpdate(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setClassroomIdToDelete(null);
    setClassroomIdToUpdate(null);
  };

  const handleConfirmDelete = () => {
    // Implement your deletion logic here (e.g., API call)
    console.log(`Deleting classroom with ID: ${classroomIdToDelete}`);
    closeModal(); // Close modal after deletion
  };

  // Get columns with the handleDelete and handleUpdate functions passed in
  const columns = createColumns(handleDelete, handleUpdate);

  return (
    <div className="relative">
      <section className="flex flex-col h-full">
        <div className="container w-[96%] mx-auto py-4 flex-grow overflow-auto">
          <div className="mb-4 font-semibold text-2xl">Classrooms</div>
          <div className="border-2 rounded-md">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </section>

      {/* Fixed Plus Circle Icon */}
      <div className="fixed right-20 bottom-12 bg-none">
        <div className="pulse">
          <FiPlusCircle
            size={60}
            stroke="white"
            fill="orange"
            onClick={openCreate}
          />
        </div>
      </div>

      {/* Delete Modal */}
      {isModalOpen && classroomIdToDelete !== null && (
        <FormModal
          table="classroom"
          type="delete"
          id={classroomIdToDelete}
          onClose={closeModal}
          onConfirmDelete={handleConfirmDelete}
        />
      )}

      {/* Update Modal */}
      {isModalOpen && classroomIdToUpdate !== null && (
        <FormModal
          table="classroom"
          type="update"
          id={classroomIdToUpdate}
          onClose={closeModal}
          data={selectedClassroom} // Pass the formatted classroom data
        />
      )}

      {/* Create Modal */}
      {isModalOpen &&
        classroomIdToUpdate === null &&
        classroomIdToDelete === null && (
          <FormModal table="classroom" type="create" onClose={closeModal} />
        )}
    </div>
  );
};

export default ClassroomListPage;
