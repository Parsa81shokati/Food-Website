import CategoryCard from "@/components/Menu/CategoryCard";

import client from "@/lib/apolloClient";
import { GET_CATEGORIES } from "@/lib/queries/Categories";

import React, { useEffect, useState } from "react";

import { GET_FOODS_BY_CATEGORY } from "@/lib/queries/Foods";
import { filterFoodsByCategory } from "@/helper/helper";

import FoodsCard from "@/components/Menu/FoodsCard";
import { useRouter } from "next/router";
import Link from "next/link";

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_CATEGORIES,
  });
  const { data: foodsData } = await client.query({
    query: GET_FOODS_BY_CATEGORY,
  });
  return {
    props: {
      categories: data.categories,
      foodsData: foodsData.meals,
    },
  };
}

function Menu({ categories, foodsData }) {
  const router = useRouter();
  const { category } = router.query;

  const filteredFoods = filterFoodsByCategory(foodsData, category);

  console.log(router.query);

  const handleCategoryClick = (catName) => {
    router.push({
      pathname: "/Menu",
      query: { category: catName },
    });
  };

  console.log(filteredFoods);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center gap-6 ">
        {categories.map((cat) => (
          <div key={cat.id} onClick={() => handleCategoryClick(cat.name)}>
            <CategoryCard data={cat} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 mt-10 ">
        {filteredFoods.map((food) => (
          <Link key={food.id} href={`/Menu/${food.slug}`}>
            <FoodsCard food={food} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Menu;
