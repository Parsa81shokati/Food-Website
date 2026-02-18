import { CREATE_Food } from "@/lib/Mutation/addFoodMutation";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

function AddFood() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    isDiscounted: false,
    discountPercentage: 0,
  });

  const [createFood, { loading, error }] = useMutation(CREATE_Food);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createFood({
        variables: {
          title: form.title,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          isDiscounted: form.isDiscounted,
          discountPercentage: form.isDiscounted
            ? Number(form.discountPercentage || 0)
            : 0,
        },
      });

      router.push("/admin/foods");
    } catch (err) {
      console.error(err.graphQLErrors);
      console.error(err.networkError);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          Add New Food
        </h1>

        {error && (
          <p className="text-red-600 mb-6 text-sm">
            Something went wrong while creating the food.
          </p>
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
                         focus:border-[#9e0910] outline-none transition"
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
                         focus:border-[#9e0910] outline-none transition"
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
                         focus:border-[#9e0910] outline-none transition"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-xl px-4 py-2
                         focus:ring-2 focus:ring-[#9e0910]/40
                         focus:border-[#9e0910] outline-none transition"
            />
          </div>
          {/* Discount */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="isDiscounted"
                checked={form.isDiscounted}
                onChange={handleChange}
                className="accent-[#9e0910]"
              />
              Discount
            </label>

            {form.isDiscounted && (
              <input
                type="number"
                name="discountPercentage"
                value={form.discountPercentage}
                onChange={handleChange}
                placeholder="Discount %"
                className="border border-gray-300 rounded-xl px-3 py-2 w-32
                           focus:ring-2 focus:ring-[#9e0910]/40
                           focus:border-[#9e0910] outline-none transition"
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
              {loading ? "Creating..." : "Create Food"}
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

export default AddFood;
