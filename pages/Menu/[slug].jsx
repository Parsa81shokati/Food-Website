import CommentCard from "@/components/DetailsPage/CommentCard";
import FoodDetails from "@/components/DetailsPage/FoodDetails";
import client from "@/lib/apolloClient";
import { GET_FOOD_BY_SLUG } from "@/lib/queries/FoodBySlug";
import { GET_FOODS_BY_CATEGORY } from "@/lib/queries/Foods";
import Image from "next/image";
import React from "react";

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_FOODS_BY_CATEGORY,
  });
  console.log("Meals from Hygraph:", data.meals);
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
    <div className="flex flex-col md:flex-row gap-15 items-center justify-center min-h-screen bg-gray-100">
      <FoodDetails food={food} />

      <div className="">
        {food.comments.map((comment) => (
          <CommentCard comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default Details;
