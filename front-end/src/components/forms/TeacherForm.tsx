"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { useState } from "react";

const classesData = {
  "Class A": ["Math", "Physics", "Chemistry", "Biology"],
  "Class B": ["History", "Geography", "Civics", "Economics"],
  "Class C": [
    "Programming",
    "Data Structures",
    "Algorithms",
    "Web Development",
  ],
  "Class D": ["Art", "Music", "Theater", "Photography"],
};

type ClassKey = keyof typeof classesData;

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
  role: z.enum(["select", "admin", "teacher"], {
    message: "Role is required!",
  }),
  class: z.array(z.string()).optional(),
  courses: z.array(z.string()).optional(),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
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
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const role = watch("role");
  const selectedClass = watch("class");

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value && !selectedClasses.includes(value)) {
      setSelectedClasses([...selectedClasses, value]);
    } else if (selectedClasses.includes(value)) {
      setSelectedClasses(selectedClasses.filter((cls) => cls !== value));
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="px-4 w-full">
        <h1 className="text-xl font-semibold">Create a new teacher</h1>
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
            Professional Information
          </span>
          <div className="space-y-1">
            <div className="flex gap-8 py-2">
              <div>
                <label className="text-xs text-gray-500">Role</label>
                <div>
                  <select
                    className="ring-[1.5px] ring-gray-300 rounded-md text-sm px-8 py-2"
                    {...register("role")}
                    defaultValue="select"
                  >
                    <option value="select">Select</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                  </select>
                  {errors.role?.message && (
                    <p className="text-xs text-red-400">
                      {errors.role.message.toString()}
                    </p>
                  )}
                </div>
              </div>
              {role === "teacher" && (
                <div>
                  <label className="text-xs text-gray-500">Class</label>
                  <div>
                    <select
                      className="ring-[1.5px] ring-gray-300 rounded-md text-sm px-8 py-2"
                      onChange={handleClassChange}
                    >
                      <option value="select">Select</option>
                      {Object.keys(classesData).map((className) => (
                        <option key={className} value={className}>
                          {className}
                        </option>
                      ))}
                    </select>
                    {errors.class?.message && (
                      <p className="text-xs text-red-400">
                        {errors.class.message.toString()}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {selectedClasses.length > 0 && role === "teacher" && (
                <div className="flex gap-8">
                  <div>
                    <label className="text-xs text-gray-500">Course</label>
                    <div>
                      <select className="ring-[1.5px] ring-gray-300 rounded-md text-sm px-8 py-2">
                        {selectedClasses.flatMap((className) =>
                          classesData[className as ClassKey]?.map((course) => (
                            <option key={course} value={course}>
                              {course}
                            </option>
                          ))
                        )}
                      </select>
                      {errors.courses?.message && (
                        <p className="text-xs text-red-400">
                          {errors.courses.message.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
                error={errors?.email}
              />
              <InputField
                label="Phone"
                name="phone"
                defaultValue={data?.phone}
                register={register}
                error={errors.phone}
              />
            </div>
            <div className="w-full">
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
        <div className="flex mt-8 mb-4">
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
        <button className="bg-orange-400 hover:bg-white hover:text-orange-400 hover:border-orange-400 hover:border-2 text-white p-2 rounded-md">
          {type === "create" ? "Create" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default TeacherForm;
