import BackButton from "@/components/BackButton";
import CommentCard from "@/components/DetailsPage/CommentCard";
import FoodDetails from "@/components/DetailsPage/FoodDetails";
import client from "@/lib/apolloClient";
import { GET_FOOD_BY_SLUG } from "@/lib/queries/FoodBySlug";
import { GET_FOODS_BY_CATEGORY } from "@/lib/queries/Foods";
import Image from "next/image";
import React from "react";
import { MdOutlineRateReview } from "react-icons/md";

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_FOODS_BY_CATEGORY,
  });

  const paths = data.meals.map((food) => ({
    params: { slug: food.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_FOOD_BY_SLUG,
    variables: { slug: params.slug },
  });

  if (!data.meal) {
    return { notFound: true };
  }

  return {
    props: {
      food: data.meal,
    },
    revalidate: 60,
  };
}

function Details({ food }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* دکمه بازگشت */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* محتوای اصلی */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* بخش جزئیات غذا */}
          <div className="lg:w-2/3">
            <FoodDetails food={food} />
          </div>

          {/* بخش نظرات */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* هدر نظرات */}
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#9e0910]/10 p-2 rounded-full">
                  <MdOutlineRateReview className="text-[#9e0910] text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Customer Reviews
                </h2>
                <span className="bg-[#9e0910] text-white text-xs px-2 py-1 rounded-full">
                  {food.comments?.length || 0}
                </span>
              </div>

              {/* لیست نظرات */}
              {food.comments && food.comments.length > 0 ? (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                  {food.comments.map((comment, index) => (
                    <CommentCard key={index} comment={comment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-block p-4 bg-gray-100 rounded-full mb-3">
                    <MdOutlineRateReview className="text-3xl text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">No reviews yet</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Be the first to review!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Details.getLayout = function getLayout(page) {
  return <>{page}</>; // برگرداندن صفحه بدون هیچ لایوتی
};

export default Details;
