import React, { useState } from "react";
import { MapPin, SlidersHorizontal } from "lucide-react";
import Button from "./Button";
import { useFilters } from "../../context/FilterContext"; // ✅ ADD THIS

interface HeaderProps {
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [location, setLocation] = useState("Chengalpattu");
  const [showFilters, setShowFilters] = useState(false);
  const { filters, setFilters } = useFilters(); // ✅ USE CONTEXT

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <header className="bg-white shadow-md py-3 px-6 flex flex-col md:flex-row items-center justify-between gap-3 sticky top-0 z-50">
      {/* Brand & Nav */}
      <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
        <h1
          className="text-2xl font-bold text-blue-700 cursor-pointer"
          onClick={() => onPageChange?.("home")}
        >
          ProMart
        </h1>
        <nav className="flex gap-5 text-sm font-medium">
          <button
            onClick={() => onPageChange?.("home")}
            className={`hover:text-blue-700 transition-colors ${
              currentPage === "home" ? "text-blue-700 font-semibold" : "text-gray-700"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onPageChange?.("browse")}
            className={`hover:text-blue-700 transition-colors ${
              currentPage === "browse" ? "text-blue-700 font-semibold" : "text-gray-700"
            }`}
          >
            Browse Products
          </button>
        </nav>
      </div>

      {/* Location + Filters */}
      <div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-md border border-blue-100 w-full md:w-auto">
        <MapPin className="text-blue-600" size={18} />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
          className="bg-transparent flex-1 outline-none text-sm text-gray-700"
        />
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition"
        >
          Search
        </Button>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-blue-600 border border-blue-200 hover:bg-blue-50 transition"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {/* Auth */}
      <div className="flex gap-3 w-full md:w-auto justify-end">
        <button
          onClick={() => onPageChange?.("login")}
          className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition text-sm font-medium"
        >
          Login
        </button>
        <button
          onClick={() => onPageChange?.("seller-register")}
          className="px-4 py-1.5 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition shadow-sm"
        >
          Become a Seller
        </button>
      </div>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="absolute top-full mt-2 right-6 bg-white border border-blue-100 rounded-lg shadow-lg p-4 w-72 z-50">
          <h3 className="text-blue-700 font-semibold mb-2 text-sm">Filter Options</h3>

          <div className="mb-3">
            <label className="block text-xs text-gray-600 mb-1">Category</label>
            <select
              className="w-full border border-blue-200 rounded-md px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-blue-400"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="">All</option>
              <option value="Smartphones">Smartphones</option>
              <option value="Laptops">Laptops</option>
              <option value="Cameras">Cameras</option>
              <option value="Audio">Audio</option>
              <option value="Tablets">Tablets</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-xs text-gray-600 mb-1">Brand</label>
            <select
              className="w-full border border-blue-200 rounded-md px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-blue-400"
              value={filters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
            >
              <option value="">All</option>
              <option value="Samsung">Samsung</option>
              <option value="HP">HP</option>
              <option value="Canon">Canon</option>
              <option value="Apple">Apple</option>
              <option value="boAt">boAt</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Price Range</label>
            <select
              className="w-full border border-blue-200 rounded-md px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-blue-400"
              value={filters.priceRange}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
            >
              <option value="">All</option>
              <option value="0-5000">Below ₹5,000</option>
              <option value="5000-20000">₹5,000 - ₹20,000</option>
              <option value="20000-50000">₹20,000 - ₹50,000</option>
              <option value="50000-100000">₹50,000 - ₹1,00,000</option>
              <option value="100000+">Above ₹1,00,000</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
