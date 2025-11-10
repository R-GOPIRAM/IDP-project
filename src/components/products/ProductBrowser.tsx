import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Grid, List, Store } from "lucide-react";
import Button from "../common/Button";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";

export default function ProductBrowser() {
  const [products, setProducts] = useState<any[]>([]);
  const [nearbyProducts, setNearbyProducts] = useState<any[]>([]);
  const [location, setLocation] = useState("Chengalpattu");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchNearby();
  }, [location]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data.products);
  };

  const fetchNearby = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/products/recommendations/${location}`
    );
    setNearbyProducts(res.data.products);
  };

  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-green-700">T-ele Santhai</h1>
        <div className="flex gap-3 items-center">
          <MapPin className="text-green-600" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          />
          <Button
            className="bg-green-600 text-white"
            onClick={fetchNearby}
          >
            Search
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Nearby shops */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Store className="text-green-700" /> Shops Near You
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nearbyProducts.map((p) => (
              <div
                key={p._id}
                className="bg-white border rounded-lg p-3 shadow-sm"
              >
                <h3 className="font-semibold">{p.sellerId?.businessName}</h3>
                <p className="text-sm text-gray-500">
                  {p.sellerId?.businessAddress}
                </p>
                <p className="text-green-700 text-sm">
                  {p.name} – ₹{p.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Products</h2>
          <div>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-green-600 text-white" : "text-gray-400"}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-green-600 text-white" : "text-gray-400"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onView={() => setSelectedProduct(p)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
