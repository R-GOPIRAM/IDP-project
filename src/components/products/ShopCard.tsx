// ShopCard.tsx
import React from 'react';
import Button from '../common/Button';

export default function ShopCard({ shop, onView }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 border">
      <img src={shop.image} alt={shop.name} className="w-full h-32 object-cover rounded-md mb-3" />
      <h4 className="font-semibold text-gray-800">{shop.name}</h4>
      <p className="text-sm text-gray-500">{shop.address}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-yellow-600 font-medium">⭐ {shop.rating}</div>
        <Button variant="outline" size="sm" onClick={() => onView?.(shop)}>View Shop</Button>
      </div>
    </div>
  );
}
