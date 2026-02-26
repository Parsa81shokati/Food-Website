import CategoryCard from "@/components/Menu/CategoryCard";
import client from "@/lib/apolloClient";
import { GET_CATEGORIES } from "@/lib/queries/Categories";
import React from "react";
import { GET_FOODS_BY_CATEGORY } from "@/lib/queries/Foods";
import { filterFoodsByCategory } from "@/helper/helper";
import FoodsCard from "@/components/Menu/FoodsCard";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdOutlineRestaurantMenu } from "react-icons/md";

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

  const handleCategoryClick = (catName) => {
    router.push({
      pathname: "/Menu",
      query: { category: catName },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50/30 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* هدر صفحه */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#9e0910]/10 px-4 py-2 rounded-full mb-4">
            <MdOutlineRestaurantMenu className="text-[#9e0910]" />
            <span className="text-sm font-medium text-[#9e0910]">Our Menu</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            Delicious <span className="text-[#9e0910]">Dishes</span>
          </h1>
        </div>

        {/* دسته‌بندی‌ها - همون CategoryCard خودت */}
        <div className="flex flex-row flex-wrap justify-center py-6 gap-3 md:gap-6 bg-white/50 rounded-2xl p-6 mb-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="cursor-pointer transform transition-transform hover:scale-105"
            >
              <CategoryCard data={cat} category={category} />
            </div>
          ))}
        </div>

        {/* گرید محصولات */}
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredFoods.map((food) => (
              <Link
                key={food.id}
                href={`/Menu/${food.slug}`}
                className="transform transition-transform hover:scale-103 hover:-translate-y-1"
              >
                <FoodsCard food={food} />
              </Link>
            ))}
          </div>
        ) : (
          // حالت خالی
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
              <MdOutlineRestaurantMenu className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No items found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              No dishes available in this category
            </p>
            <button
              onClick={() => router.push({ pathname: "/Menu" })}
              className="px-6 py-2 bg-[#9e0910] text-white rounded-full text-sm hover:bg-[#7e0710] transition-colors"
            >
              View all items
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
