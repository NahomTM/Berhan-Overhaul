"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

// Lazy load forms
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

interface FormModalProps {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
  onConfirmDelete?: () => void;
  onClose?: () => void;
}

const FormModal: React.FC<FormModalProps> = ({
  table,
  type,
  data,
  id,
  onConfirmDelete,
  onClose,
}) => {
  const FormContent = () => {
    if (type === "delete" && id) {
      return (
        <form
          className="p-4 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onConfirmDelete?.();
          }}
        >
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button
            type="submit"
            className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
          >
            Delete
          </button>
        </form>
      );
    }
    if (type === "create" || type === "update") {
      return forms[table] ? forms[table](type, data) : <p>Form not found!</p>;
    }
    return <p>Invalid form type.</p>;
  };

  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] shadow-custom">
        <FormContent />
        <button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <Image src="/close.png" alt="Close" width={14} height={14} />
        </button>
      </div>
    </div>
  );
};

export default FormModal;
