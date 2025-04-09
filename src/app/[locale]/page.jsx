import HomePageComponent from "./components/Home/HomePageComponent";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import axios from "axios";
const baseURL = process.env.BASE_API;

async function getAllQuestions(locale) {
  try {
    const respose = await axios.post(`${baseURL}/api/questions`, {
      locale,
    });
    const path = baseURL;
    // console.log({ respose });
    revalidatePath(`/`, "page");
    // const newData = await response.json();
    // console.log("res ferstad");
    // console.log(window.URL)
    return respose.data;
  } catch (error) {
    console.log(error);
  }
}
const filterOptions = async (locale) => {
  const res = await axios.post(`${process.env.BASE_API}/api/auth/getfl`, {
    locale: locale,
  });
  return res.data;
};

export default async function HomePage({ params: { locale } }) {
  const session = await getServerSession();
  const res = await getAllQuestions(locale);
  const fetchFilterData = await filterOptions(locale);
  // console.log("res gereft!");
  // console.log({ res });

  return (
    <HomePageComponent
      isAuth={session}
      res={res}
      fetchFilterData={fetchFilterData?.data}
    />
  );
}
