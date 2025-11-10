import React, { useState } from "react";
import { ArrowLeft, Tag } from "lucide-react";
import Button from "../common/Button";
import BargainChat from "./BargainChat";
import OfferCard from "../offers/OfferCard";

export default function ProductDetailPage({ product, onBack }: any) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [openChat, setOpenChat] = useState(false);

  const productOffers = [
    {
      id: "po1",
      title: "Free Accessories Combo!",
      description: "Buy this product and get a screen guard + pouch absolutely free.",
      image:
        "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600",
      validTill: "Valid till 30 Nov 2025",
    },
    {
      id: "po2",
      title: "₹500 Cashback Offer",
      description: "Get ₹500 cashback on prepaid or UPI payment options.",
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
      validTill: "Limited time offer",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg p-6 shadow-sm">
        {/* 🔙 Header */}
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-blue-700 hover:text-blue-900 flex items-center gap-1 transition"
          >
            <ArrowLeft /> <span className="text-sm font-medium">Back</span>
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 🖼️ Product Images */}
          <div>
            <div className="rounded-lg overflow-hidden mb-3">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-md overflow-hidden border transition ${
                    selectedImage === idx
                      ? "border-blue-600"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumb-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 📦 Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {product.brand} • {product.category}
            </p>

            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <div className="text-3xl font-bold text-blue-700">
                ₹{product.price.toLocaleString()}
              </div>
              {product.originalPrice && (
                <div className="text-sm line-through text-gray-400">
                  ₹{product.originalPrice.toLocaleString()}
                </div>
              )}
              <div className="text-sm text-gray-600 mt-1">
                Inclusive of all taxes
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-700">
                Seller:{" "}
                <span className="font-medium text-blue-700">
                  {product.seller?.name}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {product.seller?.address}
              </div>
            </div>

            {/* 🛒 Action Buttons */}
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Add to Cart
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md px-4 py-2 rounded-md transition"
                onClick={() => setOpenChat(true)}
              >
                💬 Bargain
              </Button>
            </div>

            {/* 🔍 Specifications */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">
                Key Specifications
              </h3>
              <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <li key={k}>
                    <span className="font-medium">{k}</span>: {v}
                  </li>
                ))}
              </ul>
            </div>

            {/* 📝 Description */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">
                Description
              </h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>
        </div>

        {/* 🏷️ Offers Section */}
        <div className="mt-10">
          <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-blue-700">
            <Tag className="text-blue-700" /> Offers for this Product
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {productOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </div>

      {/* 💬 Bargain Chat Modal */}
      {openChat && (
        <BargainChat product={product} onClose={() => setOpenChat(false)} />
      )}
    </div>
  );
}
