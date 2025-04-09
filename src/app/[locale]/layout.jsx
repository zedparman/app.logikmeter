import localeFont from "next/font/local";
import { ThemeProvider } from "./components/ThemeProvider";
import NavBar from "./components/Nav/NavBar";
import SessionProvider from "../context/NextAuthProvider";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";
import HomeSideNv from "./components/Home/HomeSideNv";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { GoogleTagManager } from "@next/third-parties/google";
import axios from "axios";
const IranSansFont = localeFont({
  src: "../../assets/fonts/IRANSansX-Regular.woff",
});
export async function generateMetadata({ params }) {
  if (params.locale == "fa") {
    return {
      metadataBase: new URL("https://logikmeter.com"),
      title:
        "توانمندسازی صداها، شکل‌دهی به انتخاب‌ها | Logikmeter نظرسنجی و گفتگوی آزاد",
      description:
        "با Logikmeter، در مورد موضوعات مهم اجتماعی، سیاسی، تاریخی و ... نظرسنجی کنید و نظرات دیگران را بدانید و به دیگران در انتخاب آگاهانه کمک کنید. به جامعه‌ای بپیوندید که به نظرات شما اهمیت می‌دهد.",
      keywords:
        "logikmeter, دموکراسی صدا, نظرسنجی, گفتگوی آزاد, انتخاب آگاهانه, مشارکت مردم, نظرات, ایده ها, کلاب هاوس, توییتر",
      verification: {
        google: "yEAWHW_GPIjclSGavmbbrhzf7Zzgua5Aj_6erRQRwcg",
      },
      openGraph: {
        image: "",
        title: `توانمندسازی صداها، شکل‌دهی به انتخاب‌ها | Logikmeter نظرسنجی و گفتگوی آزاد`,
        description:
          "با Logikmeter، در مورد موضوعات مهم اجتماعی، سیاسی، تاریخی و ... نظرسنجی کنید و نظرات دیگران را بدانید و به دیگران در انتخاب آگاهانه کمک کنید. به جامعه‌ای بپیوندید که به نظرات شما اهمیت می‌دهد.",
        url: "https://logikmeter.com",
        siteName: "Logikmeter",
        type: "website",
      },
      twitter: {
        card: "",
        site: "",
        title:
          "توانمندسازی صداها، شکل‌دهی به انتخاب‌ها | Logikmeter نظرسنجی و گفتگوی آزاد",
        description:
          "با Logikmeter، در مورد موضوعات مهم اجتماعی، سیاسی، تاریخی و ... نظرسنجی کنید و نظرات دیگران را بدانید و به دیگران در انتخاب آگاهانه کمک کنید. به جامعه‌ای بپیوندید که به نظرات شما اهمیت می‌دهد.",
        image: "url/image.png",
      },
    };
  } else {
    return {
      metadataBase: new URL("https://logikmeter.com"),
      title:
        "Logikmeter | Empower Voices, Shape Choices, Polling and Open Conversation",
      description:
        "With Logikmeter, take polls on important social, political, historical, etc. topics and get the opinions of others and help others make informed choices. Join a community that cares about your opinion.",
      keywords:
        "logikmeter,Voice democracy, voice survey, free conversation, informed choice, people's participation, opinions, ideas, clubhouse, Twitter",
      verification: {
        google: "yEAWHW_GPIjclSGavmbbrhzf7Zzgua5Aj_6erRQRwcg",
      },
      openGraph: {
        image: "",
        title:
          "Logikmeter | Empower Voices, Shape Choices, Polling and Open Conversation",
        description:
          "With Logikmeter, take polls on important social, political, historical, etc. topics and get the opinions of others and help others make informed choices. Join a community that cares about your opinion.",
        url: "https://logikmeter.com",
        siteName: "Logikmeter",
        type: "website",
      },
      twitter: {
        card: "",
        site: "",
        title:
          "Logikmeter | Empower Voices, Shape Choices, Polling and Open Conversation",
        description:
          "With Logikmeter, take polls on important social, political, historical, etc. topics and get the opinions of others and help others make informed choices. Join a community that cares about your opinion.",
        image: "url/image.png",
      },
    };
  }
}
const fetchC = async () => {
  const data = await axios.get(`${process.env.BASE_API}/api/auth/chcf`);
  return data.data;
};
const setDir = (locale) => {
  if (locale == "fa") {
    return "rtl";
  } else {
    return "ltr";
  }
};
export default async function RootLayout({ children, params: { locale } }) {
  const session = await getServerSession();
  const cnf = await fetchC();

  const opLocale = !locale ? "fa" : locale;
  return (
    <html lang={locale} dir={setDir(opLocale)} suppressHydrationWarning>
      <body className={IranSansFont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <StoreProvider>
              <NavBar session={session} cnf={cnf.data} />
              <NextTopLoader color="#FF0000" />
              <div className="flex flex-col space-y-6 mt-10 ">
                <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                  <aside className="hidden w-0 md:w-[200px] flex-col md:flex">
                    <HomeSideNv session={session} cnf={cnf.data} />
                  </aside>
                  <main>{children}</main>
                </div>
              </div>
              <Toaster position="top-center" reverseOrder={false} />
            </StoreProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
      <GoogleTagManager gtmId="G-LBB5MSM7EG" />
    </html>
  );
}
