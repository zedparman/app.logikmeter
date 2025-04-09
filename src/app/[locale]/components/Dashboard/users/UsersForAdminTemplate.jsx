import React from "react";
import axios from "axios";
import UsersSearchBox from "./UsersSearchBox";

const getAllUsers = async (url) => {
  const response = await axios.post(`${url + "/api/auth/get-users"}`);
  return response.data;
};
const getCn = async (url) => {
  const response = await axios.get(`${url + "/api/auth/chcf"}`);
  return response.data;
};
const UsersForAdminTemplate = async ({ pr , locale }) => {
  const res = await getAllUsers(pr);
  const cn = await getCn(pr);

  return <UsersSearchBox res={res} pr={pr} cn={cn?.data} locale={locale} />;
};

export default UsersForAdminTemplate;
