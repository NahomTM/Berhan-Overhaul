"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { classesData } from "@/lib/data";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
  class: z.array(z.string()).optional(),
  courses: z.array(z.string()).optional(),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues:
      type === "update"
        ? {
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            email: data?.email || "",
            phone: data?.phone || "",
            birthday: data?.birthday || "",
            bloodType: data?.bloodType || "",
            sex: data?.sex || "male",
            address: data?.address || "",
            img: data?.photo || "",
          }
        : {
            sex: "male",
          },
  });

  const [selectedClasses, setSelectedClasses] = useState<string[]>(() => {
    if (type === "update" && data?.classesAndSubjects) {
      return Object.keys(data.classesAndSubjects);
    }
    return [];
  });

  const [selectedCourses, setSelectedCourses] = useState<{
    [key: string]: string[];
  }>(() => {
    if (type === "update" && data?.classesAndSubjects) {
      return data.classesAndSubjects;
    }
    return {};
  });

  const availableClasses = classesData
    .map((c) => c.name)
    .filter((className) => !selectedClasses.includes(className));

  const getAvailableCoursesForClass = (className: string) => {
    const classData = classesData.find((c) => c.name === className);
    const selectedCoursesForClass = selectedCourses[className] || [];
    return (
      classData?.subjects.filter(
        (subject) => !selectedCoursesForClass.includes(subject)
      ) || []
    );
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value && value !== "select") {
      setSelectedClasses((prev) => [...prev, value]);
      setSelectedCourses((prev) => ({ ...prev, [value]: [] }));
    }
  };

  const handleCourseChange = (
    className: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    if (value && value !== "select") {
      setSelectedCourses((prev) => ({
        ...prev,
        [className]: [...(prev[className] || []), value],
      }));
    }
  };

  const removeClass = (className: string) => {
    setSelectedClasses((prev) => prev.filter((c) => c !== className));
    setSelectedCourses((prev) => {
      const newCourses = { ...prev };
      delete newCourses[className];
      return newCourses;
    });
  };

  const removeCourse = (className: string, course: string) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [className]: prev[className].filter((c) => c !== course),
    }));
  };

  const onSubmit = handleSubmit((formData) => {
    const submissionData = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
      classesAndSubjects: selectedCourses,
    };
    console.log(submissionData);
    // Handle form submission
  });

  return (
    <form className="flex flex-col gap-8 h-[98%]" onSubmit={onSubmit}>
      <div className="px-4 w-[full]">
        <h1 className="text-xl font-semibold">
          {type === "create"
            ? "Create a new student"
            : "Update student information"}
        </h1>
        <div className="mt-2">
          <span className="text-lg font-medium text-gray-400">
            Personal Information
          </span>
          <div className="space-y-1">
            <div className="flex justify-between gap-8 py-2">
              <InputField
                label="First Name"
                name="firstName"
                defaultValue={data?.firstName}
                register={register}
                error={errors.firstName}
              />
              <InputField
                label="Last Name"
                name="lastName"
                defaultValue={data?.lastName}
                register={register}
                error={errors.lastName}
              />
            </div>
            <div className="flex justify-between gap-8 py-2">
              <InputField
                label="Birthday"
                name="birthday"
                defaultValue={data?.birthday}
                register={register}
                error={errors.birthday}
                type="date"
              />
              <InputField
                label="Blood Type"
                name="bloodType"
                defaultValue={data?.bloodType}
                register={register}
                error={errors.bloodType}
              />
              <div>
                <label className="text-xs text-gray-500">Sex</label>
                <div className="">
                  <select
                    className="ring-[1.5px] ring-gray-300 rounded-md text-sm px-8 py-2"
                    {...register("sex")}
                    defaultValue={data?.sex}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.sex?.message && (
                    <p className="text-xs text-red-400">
                      {errors.sex.message.toString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-lg text-gray-400 font-medium">
            Educational Information
          </span>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500">Class</label>
              <div className="flex flex-col gap-2">
                <select
                  className="ring-[1.5px] ring-gray-300 rounded-md text-sm px-8 py-2 w-60"
                  onChange={handleClassChange}
                  value="select"
                >
                  <option value="select">Select Class</option>
                  {availableClasses.map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </select>

                {/* Display selected classes and their courses */}
                <div className="mt-2 space-y-2">
                  <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto max-h-28 overflow-y-auto">
                    {selectedClasses.map((className) => (
                      <div
                        key={className}
                        className="border rounded-md p-2 mb-2 w-60"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{className}</span>
                          <button
                            type="button"
                            onClick={() => removeClass(className)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <FiX />
                          </button>
                        </div>

                        {/* Course selection for this class */}
                        <div className="mt-2">
                          <select
                            className="ring-[1.5px] ring-gray-300 rounded-md text-sm px-8 py-2"
                            onChange={(e) => handleCourseChange(className, e)}
                            value="select"
                          >
                            <option value="select">Select Subject</option>
                            {getAvailableCoursesForClass(className).map(
                              (subject) => (
                                <option key={subject} value={subject}>
                                  {subject}
                                </option>
                              )
                            )}
                          </select>

                          {/* Display selected subjects */}
                          <div className="mt-2 flex flex-wrap gap-1">
                            {selectedCourses[className]?.map((course) => (
                              <span
                                key={course}
                                className="flex items-center border px-2 py-1 rounded-md text-xs"
                              >
                                {course}
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeCourse(className, course)
                                  }
                                  className="ml-1 text-gray-500 hover:text-red-500"
                                >
                                  <FiX />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-lg text-gray-400 font-medium">
            Contact Information
          </span>
          <div className="space-y-1">
            <div className="flex justify-between gap-8 py-2">
              <InputField
                label="Email"
                name="email"
                defaultValue={data?.email}
                register={register}
                error={errors.email}
                type="email"
              />
              <InputField
                label="Phone"
                name="phone"
                defaultValue={data?.phone}
                register={register}
                error={errors.phone}
              />
            </div>
            <div className="py-2">
              <InputField
                label="Address"
                name="address"
                defaultValue={data?.address}
                register={register}
                error={errors.address}
              />
            </div>
          </div>
        </div>
        <div className="flex mt-2">
          <div className="justify-end ml-auto">
            <label
              className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
              htmlFor="img"
            >
              <Image src="/upload.png" alt="" width={28} height={28} />
              <span>Upload a photo</span>
            </label>
            <input
              type="file"
              id="img"
              {...register("img")}
              className="hidden"
            />
            {errors.img?.message && (
              <p className="text-xs text-red-400">
                {errors.img.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>
      <button className="bg-orange-400 hover:bg-white hover:text-orange-400 hover:border-orange-400 hover:border-2 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
