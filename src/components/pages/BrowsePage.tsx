import React, { useState, useEffect } from "react";
import axios from "axios";
import { Store, Tag, Filter } from "lucide-react";
import ShopCard from "../products/ShopCard";
import ProductCard from "../products/ProductCard";
import ProductDetailPage from "../products/ProductDetail";
import ShopPage from "../shops/ShopPage";
import OfferCard from "../offers/OfferCard";
import { mockShops, mockProducts } from "../../data/mockData";
import { useFilters } from "../../context/FilterContext";

export default function BrowsePage() {
  const [products, setProducts] = useState<any[]>(mockProducts);
  const [nearbyProducts, setNearbyProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedShop, setSelectedShop] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const { filters } = useFilters(); // ✅ Access global filters

  const mockOffers = [
    {
      id: "o1",
      title: "Buy Mobile & Get Tempered Glass + Pouch Free!",
      description: "Exclusive offer for all smartphones above ₹10,000.",
      image:
        "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600",
      validTill: "Valid till 30 Nov 2025",
    },
    {
      id: "o2",
      title: "Laptop Combo Offer!",
      description:
        "Buy a laptop and get a wireless mouse & bag worth ₹1500 free.",
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      validTill: "Limited Time Offer",
    },
    {
      id: "o3",
      title: "Audio Bonanza!",
      description:
        "Get 15% off on boAt, JBL & Sony headphones this Diwali season.",
      image:
        "https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg?auto=compress&cs=tinysrgb&w=600",
      validTill: "Offer ends soon",
    },
  ];

  useEffect(() => {
    fetchNearby();
  }, []);

  const fetchNearby = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/recommendations`
      );
      setNearbyProducts(res.data.products || []);
    } catch {
      setNearbyProducts(mockProducts.slice(0, 2));
    }
  };

  // ✅ Filtering Logic
  const filteredProducts = products.filter((p) => {
    const matchCategory = !filters.category || p.category === filters.category;
    const matchBrand = !filters.brand || p.brand === filters.brand;
    const matchPrice =
      !filters.priceRange ||
      (filters.priceRange === "0-5000" && p.price < 5000) ||
      (filters.priceRange === "5000-20000" &&
        p.price >= 5000 &&
        p.price <= 20000) ||
      (filters.priceRange === "20000-50000" &&
        p.price >= 20000 &&
        p.price <= 50000) ||
      (filters.priceRange === "50000-100000" &&
        p.price >= 50000 &&
        p.price <= 100000) ||
      (filters.priceRange === "100000+" && p.price > 100000);

    return matchCategory && matchBrand && matchPrice;
  });

  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.brand ? 1 : 0) +
    (filters.priceRange ? 1 : 0);

  // 🟦 Open Product Page
  if (selectedProduct) {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  // 🏪 Open Shop Page
  if (selectedShop) {
    return (
      <ShopPage shop={selectedShop} onBack={() => setSelectedShop(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="max-w-7xl mx-auto p-6">
        {/* 🏪 Shops Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700">
            <Store className="text-blue-700" /> Shops Near You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockShops.map((s) => (
              <ShopCard key={s.id} shop={s} onView={() => setSelectedShop(s)} />
            ))}
          </div>
        </section>

        {/* 🏷️ Offers Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700">
            <Tag className="text-blue-700" /> Offers & Promotions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mockOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>

        {/* 💎 Products Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
              Products{" "}
              {activeFilterCount > 0 && (
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  <Filter className="inline w-3 h-3 mr-1" /> {activeFilterCount} Filter
                  {activeFilterCount > 1 ? "s" : ""} Applied
                </span>
              )}
            </h2>
          </div>

          <div
            className={`grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
          >
            {loading ? (
              <p className="text-center text-gray-500 py-10">
                Loading products...
              </p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={() => setSelectedProduct(p)}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full py-8">
                No products found for selected filters.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
