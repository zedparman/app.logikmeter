"use client";
import React, { useState } from "react";
import UserCard from "./UserCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";
const UsersSearchBox = ({ res, pr, cn, locale }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryValue, setCategoryValue] = useState({
    value: "",
    label: "",
  });
  const filteredData = res?.data?.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // console.log({ res });
  // console.log({ filteredData });
  const handleStop = async (name, categoryValue) => {
    console.log(categoryValue);
    await axios
      .post(`${pr}/api/auth/stmq`, {
        name: name,
        categoryValue: categoryValue.value.trim(),
        categoryName: categoryValue.label,
        locale: locale,
      })
      .then((res) => {
        // console.log(res)
        toast.success("success");
        // revalidatePath("/", "layout");
      })
      .catch((err) => console.log(err));
  };
  // console.log({ cn });
  return (
    <section className="flex flex-col w-full items-center justify-center p-2">
      <div className="border-2 border-white w-[90%] rounded-2xl xl:w-[50%] px-2 py-4 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2 w-full">
          <p className="text-white">
            Users can create question :{" "}
            <span className="text-red-400 font-bold">
              {cn?.canCreate ? "Yes" : "No"}
            </span>
          </p>
          <Button onClick={() => handleStop("canCreate")}>
            {cn?.canCreate
              ? "Disable Create Question"
              : "Enable Create Question"}
          </Button>
        </div>
        <div className="w-[90%] h-[2px] rounded-xl bg-white text-white"></div>
        <div className="flex flex-col items-center gap-2 w-full">
          <p className="text-white">
            Users need to login for vote :{" "}
            <span className="text-red-400 font-bold">
              {cn?.accountIsRequired ? "Yes" : "No"}
            </span>
          </p>
          <Button onClick={() => handleStop("accountIsRequired")}>
            {cn?.accountIsRequired ? "Disable Login" : "Enable Login"}
          </Button>
        </div>
        <div className="w-[90%] h-[2px] rounded-xl bg-white text-white"></div>
        <div className="flex flex-col items-center w-full">
          <p className="text-white">categories</p>
          <div
            style={{ direction: "ltr" }}
            className="w-full flex flex-col gap-4 my-5 items-center justify-center"
          >
            <input
              type="text"
              className="w-full p-2 rounded-lg outline-none md:w-[70%]"
              value={categoryValue.label}
              placeholder="add category label"
              onChange={(e) =>
                setCategoryValue({ ...categoryValue, label: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full p-2 rounded-lg outline-none md:w-[70%]"
              value={categoryValue.value}
              placeholder="add category name"
              onChange={(e) =>
                setCategoryValue({ ...categoryValue, value: e.target.value })
              }
            />
          </div>
          <Button onClick={() => handleStop("add", categoryValue)}>add</Button>
        </div>
      </div>
      <input
        type="text"
        className="w-full p-2 my-5 rounded-lg outline-none md:w-[50%]"
        value={searchTerm}
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        {filteredData.map((user) => (
          <UserCard user={user} key={user._id} pr={pr} />
        ))}
      </section>
    </section>
  );
};

export default UsersSearchBox;
