// TeachersPage.tsx or wherever your course type and columns function are defined
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

export type Course = {
  id: number;
  name: string;
};

// Create a function to define the columns
export const createColumns = (
  handleDelete: (id: number) => void,
  handleUpdate: (id: number) => void
): ColumnDef<Course>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="flex items-center space-x-2">
          <span>{course.name}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const course = row.original;

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
                navigator.clipboard.writeText(course.id.toString())
              }
            >
              Copy course ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/list/teachers/${course.id}`} passHref>
                View Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdate(course.id)}>
              Update Course
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(course.id)}>
              Delete Course
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
