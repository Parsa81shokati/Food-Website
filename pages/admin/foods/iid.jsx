import client from "@/lib/apolloClient";
import { UPDATE_FOOD } from "@/lib/Mutation/updatefoodMutation";
import { GET_FOOD_BY_ID } from "@/lib/queries/AdminFood";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data } = await client.query({
    query: GET_FOOD_BY_ID,
    variables: { id },
  });

  if (!data.meal) {
    return { notFound: true };
  }

  return {
    props: {
      food: data.meal,
    },
  };
}

export default function EditFood({ food }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: food.title,
    description: food.description || "",
    price: food.price,
    isDiscounted: food.isDiscounted,
    discountPercentage: food.discountPercentage || 0,
  });

  const [updateFood, { loading, error }] = useMutation(UPDATE_FOOD, {
    onError(err) {
      console.error("Apollo Error:", err);
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFood({
        variables: {
          id: food.id,
          title: form.title,
          description: form.description,
          price: Number(form.price),
          isDiscounted: form.isDiscounted,
          discountPercentage: form.isDiscounted
            ? Number(form.discountPercentage)
            : 0,
        },
      });
      router.push("/admin/foods");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Food</h1>

        {error && <pre className="text-red-500 text-sm">{error.message}</pre>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-300 outline-none"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-300 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-300 outline-none"
            />
          </div>

          {/* Discount */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                name="isDiscounted"
                checked={form.isDiscounted}
                onChange={handleChange}
                className="accent-orange-500"
              />
              Discount
            </label>
            {form.isDiscounted && (
              <input
                type="number"
                name="discountPercentage"
                value={form.discountPercentage}
                onChange={handleChange}
                placeholder="DiscountPercentage"
                className="border rounded-xl px-3 py-2 w-32 focus:ring-2 focus:ring-orange-300 outline-none"
              />
            )}
          </div>

          {/* Current Image */}
          {food.image?.url && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Current image</p>
              <img
                src={food.image.url}
                alt={food.title}
                className="w-full h-60 object-cover rounded-xl border"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition disabled:opacity-50"
            >
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/foods")}
              className="flex-1 border border-gray-300 hover:bg-gray-100 rounded-xl py-3 transition"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
