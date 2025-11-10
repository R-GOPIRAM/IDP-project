import React from "react";

export default function OfferCard({ offer }: { offer: any }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-sm hover:shadow-md p-5 flex items-center gap-4 transition-all cursor-pointer">
      <img
        src={offer.image}
        alt="offer"
        className="w-20 h-20 rounded-lg object-cover"
      />
      <div>
        <h3 className="text-lg font-semibold text-blue-700">{offer.title}</h3>
        <p className="text-sm text-gray-600">{offer.description}</p>
        <span className="text-xs text-blue-500 font-medium mt-2 inline-block">
          {offer.validTill}
        </span>
      </div>
    </div>
  );
}
