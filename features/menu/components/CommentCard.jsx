import React, { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaUserCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

function CommentCard({ comment }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // محاسبه ستاره‌ها
  const rating = comment.rating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // تاریخ به فرمت خوانا
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const commentText = comment.comment?.text || comment.text || "";
  const isLongComment = commentText.length > 150;
  const displayText = isExpanded ? commentText : commentText.slice(0, 150);

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 hover:border-[#9e0910]/20 p-4 shadow-sm hover:shadow-md transition-all duration-300">
      {/* خط کناری تزئینی */}
      <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-[#9e0910] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* هدر کارت */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* آواتار */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9e0910]/10 to-[#c20e17]/10 flex items-center justify-center">
            <FaUserCircle className="text-2xl text-[#9e0910]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-800">
                {comment.authorName || "Anonymous"}
              </h3>
              {comment.verified && (
                <MdVerified
                  className="text-blue-500 text-xs"
                  title="Verified Purchase"
                />
              )}
            </div>
            <p className="text-xs text-gray-400">
              {formatDate(comment.createdAt)}
            </p>
          </div>
        </div>

        {/* امتیاز عددی */}
        <div className="bg-[#9e0910]/10 px-2 py-1 rounded-full">
          <span className="text-xs font-bold text-[#9e0910]">{rating}.0</span>
        </div>
      </div>

      {/* ستاره‌ها */}
      <div className="flex items-center gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <FaStar key={i} className="text-yellow-400 text-xs" />;
          } else if (hasHalfStar && i === fullStars) {
            return (
              <FaStarHalfAlt key={i} className="text-yellow-400 text-xs" />
            );
          } else {
            return <FaRegStar key={i} className="text-gray-300 text-xs" />;
          }
        })}
      </div>

      {/* متن نظر */}
      <div className="text-sm text-gray-600 leading-relaxed">
        <p className="whitespace-pre-line">
          {displayText}
          {isLongComment && !isExpanded && "..."}
        </p>

        {isLongComment && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#9e0910] text-xs font-medium mt-2 hover:underline focus:outline-none"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* لایک یا تعامل (اختیاری) */}
      {comment.likes && (
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
          <button className="text-xs text-gray-400 hover:text-[#9e0910] transition-colors">
            👍 Helpful ({comment.likes})
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentCard;
