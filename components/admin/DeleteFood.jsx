import { UPDATE_FOOD } from "@/lib/Mutation/deleteFoodMutation";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";
import React, { useState } from "react";

function DeleteFood({ food }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const [deleteFood, { loading, error }] = useMutation(UPDATE_FOOD);

  const handleDelete = async () => {
    try {
      await deleteFood({
        variables: { id: food.id },
      });

      setShowConfirm(false);
      router.replace(router.asPath);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button
        onClick={() => setShowConfirm(true)}
        className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-[#9e0910] hover:bg-red-100 rounded-lg text-sm font-medium transition"
      >
        <RiDeleteBin5Line className="text-lg" />
        Delete
      </button>

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm
                      flex items-center justify-center px-4"
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            {/* Header */}
            <h2 className="text-xl font-extrabold text-[#9e0910] mb-3">
              Delete Food
            </h2>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Are you sure you want to delete this item?
              <br />
              <span className="text-[#9e0910] font-medium">
                This action cannot be undone.
              </span>
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-[#9e0910] hover:bg-[#7f070d]
                         text-white py-2.5 rounded-xl font-medium
                         transition"
              >
                Yes, delete
              </button>

              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border border-gray-300
                         hover:bg-gray-100 text-gray-700
                         py-2.5 rounded-xl font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteFood;
