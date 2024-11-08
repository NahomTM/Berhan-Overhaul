// TeachersPage.tsx or wherever your teacher type and columns function are defined
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export type Teacher = {
 id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  birthday: string;
  bloodType?: string;
  sex: string;
  address: string;
  classesAndSubjects: {
    [className: string]: string[] | undefined;
  };
};

// Create a function to define the columns
export const createColumns = (handleDelete: (id: number) => void, handleUpdate: (id: number) => void): ColumnDef<Teacher>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("id")}</div>
    ),
  },
  {
    id: "photoAndName",
    header: "Name",
    cell: ({ row }) => {
      const teacher = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Image
            src={teacher.photo}
            alt={teacher.name}
            width={40}
            height={40}
            className="h-8 w-8 rounded-full"
          />
          <span>{teacher.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email") || "N/A"}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "classes",
    header: "Classes",
    cell: ({ row }) => {
      const classesAndSubjects = row.original.classesAndSubjects;
      const classes = Object.keys(classesAndSubjects);
      return <div>{classes.join(", ")}</div>;
    },
  },
  {
    accessorKey: "subjects",
    header: "Subjects",
    cell: ({ row }) => {
      const classesAndSubjects = row.original.classesAndSubjects;
      return (
        <div>
          {Object.entries(classesAndSubjects).map(([className, subjects]) => (
            <div key={className}>
              {subjects?.map(subject => `${subject} (${className})`).join(", ")}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const teacher = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(teacher.id.toString())
              }
            >
              Copy teacher ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/list/teachers/${teacher.id}`} passHref >
                View Teacher
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdate(teacher.id)}>
              Update Teacher
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(teacher.id)}>
              Delete Teacher
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];