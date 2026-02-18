import React from "react";

function EditCategory({ setEditingCategory, editingCategory }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 shadow max-w-md w-full relative">
        <button
          onClick={() => setEditingCategory(null)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="bg-white p-6 rounded-xl shadow max-w-lg">
          <h1 className="text-xl font-bold mb-4">ویرایش کتگوری</h1>

          <form
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   updateCategory({
            //     variables: {
            //       id: data.category.id,
            //       name,
            //     },
            //   });
            // }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm mb-1">نام کتگوری</label>
              <input
                type="text"
                value={editingCategory.name}
                // onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            {/* {error && <p className="text-red-500 text-sm">{error.message}</p>} */}

            <button
              type="submit"
              // disabled={updating}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {/* {updating ? "در حال ذخیره..." : "ذخیره تغییرات"} */}
            </button>
          </form>
        </div>
      </div>{" "}
    </div>
  );
}

export default EditCategory;
