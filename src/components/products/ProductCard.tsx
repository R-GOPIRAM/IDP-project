import React from "react";

export default function ProductCard({ product ,onView }) {
  return (
    <div
      onClick={onView}
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      <img
        src={product.images?.[0] || "https://via.placeholder.com/200"}
        alt={product.name}
        className="w-full h-52 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600">{product.category}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-bold text-blue-700">
            ₹{product.price.toLocaleString()}
          </p>
          <span className="text-yellow-500 text-sm font-medium">
            ⭐ {product.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
