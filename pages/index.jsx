import client from "@/lib/apollo/Client";
import { GET_DISCOUNTED_FOODS } from "@/features/admin/queries/DiscountedFoods";
import TableReservation from "@/features/home/TableReservation";
import DiscountSwiper from "@/features/home/DiscountSwiper";
import HomeHero from "@/features/home/HomeHero";
import AboutUs from "@/features/home/AboutUs";

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
    <div className=" flex flex-col font-sans min-h-screen gap-20 md:gap-20 ">
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
