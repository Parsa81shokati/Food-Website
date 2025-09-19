import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import client from "@/lib/apolloClient";
import { GET_DISCOUNTED_FOODS } from "@/lib/queries/DiscountedFoods";
import TableReservation from "@/components/Reservation/TableReservation";
import DiscountSwiper from "@/components/Discount/DiscountSwiper";
import HomeHero from "@/components/Hero/HomeHero";
import AboutUs from "@/components/AboutUs/AboutUs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_DISCOUNTED_FOODS,
  });
  return {
    props: {
      discounted: data,
    },
  };
}

export default function Home({ discounted }) {
  return (
    <div className=" flex flex-col font-sans min-h-screen gap-20 md:gap-30 ">
      <HomeHero />
      <div>
        <DiscountSwiper discounted={discounted} />
      </div>
      <div>
        <TableReservation />
      </div>
      <div>
        <AboutUs />
      </div>
    </div>
  );
}
