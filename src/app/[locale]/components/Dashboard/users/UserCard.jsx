import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
const UserCard = ({ user, pr }) => {
  const router = useRouter();

  const banHandler = async (email) => {
    await axios
      .post(`${pr}/api/auth/ban`, {
        email: email,
      })
      .then((res) => {
        // console.log(res);
        toast.success("success");
        router.refresh();
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  return (
    <div className="flex flex-col p-2 border border-primary rounded-lg">
      <h1>{user?.name}</h1>
      <h2>{user?.email}</h2>
      <Button
        onClick={() => banHandler(user?.email)}
        disabled={user?.isBanned == true}
        className={`${user?.isBanned == true ? "opacity-60" : ""}`}
      >
        {user?.isBanned == true ? "Banned" : "Ban"}
      </Button>
    </div>
  );
};

export default UserCard;
