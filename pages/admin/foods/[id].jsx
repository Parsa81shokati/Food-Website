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

function Test({ food }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: food.title,
    description: food.description || "",
    price: food.price,
    isDiscounted: Boolean(food.isDiscounted),
    discountPercentage: food.discountPercentage ?? 0,
  });

  const [updateFood, { loading, error }] = useMutation(UPDATE_FOOD);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          discountPercentage: Number(form.discountPercentage),
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
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          Edit Food
        </h1>

        {error && (
          <pre className="text-red-600 text-sm mb-6">{error.message}</pre>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-xl px-4 py-2
                       focus:ring-2 focus:ring-[#9e0910]/40
                       focus:border-[#9e0910]
                       outline-none transition"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-xl px-4 py-2
                       focus:ring-2 focus:ring-[#9e0910]/40
                       focus:border-[#9e0910]
                       outline-none transition"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="border border-gray-300 rounded-xl px-4 py-2
                       focus:ring-2 focus:ring-[#9e0910]/40
                       focus:border-[#9e0910]
                       outline-none transition"
            />
          </div>

          {/* Discount */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="isDiscounted"
                checked={form.isDiscounted}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setForm((prev) => ({
                    ...prev,
                    isDiscounted: checked,
                    discountPercentage: checked ? prev.discountPercentage : 0,
                  }));
                }}
                className="accent-[#9e0910]"
              />
              Discount
            </label>

            {form.isDiscounted && (
              <input
                type="number"
                name="discountPercentage"
                value={form.discountPercentage}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    discountPercentage: Number(e.target.value),
                  }))
                }
                placeholder="Discount %"
                className="border border-gray-300 rounded-xl px-3 py-2 w-32
                         focus:ring-2 focus:ring-[#9e0910]/40
                         focus:border-[#9e0910]
                         outline-none transition"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#9e0910] hover:bg-[#7f070d]
                       text-white py-3 rounded-xl font-medium transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/foods")}
              className="flex-1 border border-gray-300 text-gray-700
                       hover:bg-gray-100 rounded-xl py-3 font-medium transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Test;
