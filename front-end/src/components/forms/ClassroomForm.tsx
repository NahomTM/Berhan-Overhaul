"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { coursesData } from "@/lib/data"; // Assuming coursesData is an array of { id: number, name: string }

const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    subjects: z.array(z.string()).min(1, { message: "At least one subject is required" }),
});


type Inputs = z.infer<typeof schema>;

const ClassForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
        defaultValues: type === "update" ? {
            name: data?.name || "",
            subjects: data?.subjects || [],
        } : {
            name: "",
            subjects: [],
        },
    });

    const selectedSubjects = watch("subjects") || [];

    // Get available subjects (excluding already selected ones)
    const availableSubjects = coursesData
        .map(course => course.name)
        .filter(subject => !selectedSubjects.includes(subject));

    const onSubmit = handleSubmit((formData) => {
        console.log("Form submitted:", formData);
    });

    const addSubject = (subjectName: string) => {
        if (subjectName) {
            setValue("subjects", [...selectedSubjects, subjectName]);
        }
    };

    const removeSubject = (subjectToRemove: string) => {
        setValue(
            "subjects",
            selectedSubjects.filter((subject) => subject !== subjectToRemove)
        );
    };

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <div>
                <h1 className="text-xl font-semibold">
                    {type === "create" ? "Create a new classroom" : "Update classroom"}
                </h1>
                <div className="mt-2">
                    <InputField
                        label="Classroom Name"
                        name="name"
                        register={register}
                        error={errors.name}
                    />
                </div>
                
                <div className="mt-2">
                    <label className="text-xs text-gray-500">Subjects</label>
                    <div className="flex gap-2">
                        {/* Select field for available subjects */}
                        <select
                            onChange={(e) => {
                                if (e.target.value) {
                                    addSubject(e.target.value);
                                    e.target.value = "select"; // Reset select after adding
                                }
                            }}
                            className="ring-[1.5px] ring-gray-300 rounded-md text-sm px-4 py-2"
                            defaultValue="select"
                        >
                            <option value="select" disabled>Select a subject</option>
                            {availableSubjects.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {errors.subjects?.message && (
                        <p className="text-xs text-red-400">{errors.subjects.message}</p>
                    )}
                </div>

                {/* Display selected subjects with a delete option */}
                <div className="mt-4">
                    <label className="text-xs text-gray-500">Subjects in this classroom:</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedSubjects.map((subject) => (
                            <div
                                key={subject}
                                className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                            >
                                {subject}
                                <FiX
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => removeSubject(subject)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <button className="bg-orange-400 hover:bg-white hover:text-orange-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default ClassForm;
