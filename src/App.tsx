import React, { useState } from "react";
import { AuthContext, useAuthProvider } from "./hooks/useAuth";
import { CartContext, useCartProvider } from "./hooks/useCart";
import Header from "./components/common/Header";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/auth/LoginPage";
import SellerRegistrationPage from "./components/seller/SellerRegistrationPage";
import SellerVerificationPage from "./components/admin/SellerVerificationPage";
import SellerDashboard from "./components/seller/SellerDashboard";
import AddProductPage from "./components/seller/AddProductPage";
import SellerOrdersPage from "./components/seller/SellerOrdersPage";
import CartPage from "./components/cart/CartPage";
import MyOrdersPage from "./components/customer/MyOrdersPage";
import ReviewsPage from "./components/customer/ReviewsPage";
import ProductDetailPage from "./components/products/ProductDetail";
import PaymentPage from "./components/payment/PaymentPage";
import BrowsePage from "./components/pages/BrowsePage";
import { FilterProvider } from "./context/FilterContext";
import WatsonxChatbot from "./components/chatbot/WatsonxChatbot"; // ✅ IBM Watson Chatbot

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const authContext = useAuthProvider();
  const cartContext = useCartProvider();

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onPageChange={setCurrentPage} />;
      case "login":
        return <LoginPage onPageChange={setCurrentPage} />;
      case "seller-register":
        return <SellerRegistrationPage onPageChange={setCurrentPage} />;
      case "browse":
        return <BrowsePage />;
      case "product-detail":
        return <ProductDetailPage onPageChange={setCurrentPage} />;
      case "seller-verification":
        return <SellerVerificationPage onPageChange={setCurrentPage} />;
      case "seller-dashboard":
        return <SellerDashboard onPageChange={setCurrentPage} />;
      case "add-product":
        return <AddProductPage onPageChange={setCurrentPage} />;
      case "seller-orders":
        return <SellerOrdersPage onPageChange={setCurrentPage} />;
      case "cart":
        return <CartPage onPageChange={setCurrentPage} />;
      case "payment":
        return <PaymentPage onPageChange={setCurrentPage} />;
      case "my-orders":
        return <MyOrdersPage onPageChange={setCurrentPage} />;
      case "reviews":
        return <ReviewsPage onPageChange={setCurrentPage} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <AuthContext.Provider value={authContext}>
      <CartContext.Provider value={cartContext}>
        <FilterProvider>
          <div className="min-h-screen bg-gray-50 relative">
            <Header currentPage={currentPage} onPageChange={setCurrentPage} />
            {renderPage()}
            <WatsonxChatbot />
          </div>
        </FilterProvider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
