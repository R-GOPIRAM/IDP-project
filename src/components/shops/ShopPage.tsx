import React from "react";
import { ArrowLeft, Star } from "lucide-react";
import ProductCard from "../products/ProductCard";
import pro1 from "../../assets/redmi.webp";
import pro2 from "../../assets/mi.jpg";

export default function ShopPage({ shop, onBack }: any) {
  const mockProducts = [
    {
      id: "p1",
      name: "Redmi Note 12 Pro",
      price: 14999,
      category: "Smartphones",
      images: [
        pro1,
      ],
    },
    {
      id: "p2",
      name: "Mi Dual Driver",
      price: 459,
      category: "Audio",
      images: [
        pro2,
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <button onClick={onBack} className="text-blue-700 flex items-center mb-4">
          <ArrowLeft className="mr-2" /> Back
        </button>

        <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
          <img
            src={shop.image}
            alt={shop.name}
            className="w-48 h-48 object-cover rounded-lg border"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{shop.name}</h1>
            <p className="text-sm text-gray-600 mt-1">{shop.address}</p>
            <div className="flex items-center text-yellow-500 mt-2">
              <Star className="w-5 h-5 fill-yellow-500" />
              <span className="ml-1 font-semibold">{shop.rating}</span>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Products from this Shop</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockProducts.map((p) => (
            <ProductCard key={p.id} product={p} onView={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}
