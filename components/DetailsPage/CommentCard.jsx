import React from "react";
import { FaStar } from "react-icons/fa";

function CommentCard({ comment }) {
  return (
    <div className="flex flex-col bg-white border-2 border-gray-100 mx-5 md:mx-0 p-3 md:p-4 rounded-lg shadow-md">
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-sm md:text-xl font-bold">{comment.authorName}</h3>
        <p className="text-xs md:text-sm text-gray-500">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-2">
        <p className="text-sm md:text-lg text-gray-700">
          {comment.comment.text}
        </p>
      </div>
      <div className="flex mt-3">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar
            key={i}
            className={i < comment.rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    </div>
  );
}

export default CommentCard;
