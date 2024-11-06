// TeachersPage.tsx or wherever your classRoom type and columns function are defined
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

export type Classroom = {
  id: number;
  name: string;
  capacity: number;
};

// Create a function to define the columns
export const createColumns = (handleDelete: (id: number) => void): ColumnDef<Classroom>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("id")}</div>
    ),
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const classRoom = row.original;
      return (
        <div className="flex items-center space-x-2">
          <span>{classRoom.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
    cell: ({ row }) => <div>{row.getValue("capacity") as String[] || "N/A"}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const classRoom = row.original;

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
                navigator.clipboard.writeText(classRoom.id.toString())
              }
            >
              Copy classRoom ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/list/teachers/${classRoom.id}`} passHref >
                View Class
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(classRoom.id)}>
              Delete Class
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];