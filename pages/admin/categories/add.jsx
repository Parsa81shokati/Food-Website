import { CREATE_CATEGORY } from "@/lib/Mutation/addCategory";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddCategory() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
  });

  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory({
        variables: {
          name: form.name,
          slug: form.slug,
        },
      });

      router.push("/admin/categories");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-xl font-bold mb-6">افزودن دسته‌بندی</h1>

      {error && <p className="text-red-500 mb-4">خطا در ساخت دسته‌بندی</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-lg shadow"
      >
        <div>
          <label className="block text-sm mb-1">عنوان</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Slug</label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="مثلا: pizza"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {loading ? "در حال ذخیره..." : "ایجاد دسته"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/categories")}
            className="border px-4 py-2 rounded"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}
