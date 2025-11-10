// src/data/mockData.ts
import shop1 from "../assets/sreeelectronics.jpeg";
import shop2 from "../assets/shop2.jpeg";
import shop3 from "../assets/shop3.jpg";
import product1 from "../assets/hp.jpg";
import product2 from "../assets/boat.jpg";
import product3 from "../assets/canon.jpg";
// 🏪 Mock Shops
export const mockShops = [
  {
    id: "1",
    name: "Sri Electronics",
    address: "Chengalpattu",
    rating: 4.7,
    image:shop1
  },
  {
    id: "2",
    name: "Tech Zone",
    address: "SP Koil",
    rating: 4.5,
    image:shop2,
  },
  {
    id: "3",
    name: "Mega Mobiles",
    address: "Mahindra City",
    rating: 4.6,
    image:shop3,
  },
];

// 🛒 Mock Products
export const mockProducts = [
  {
    id: "p1",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    price: 129999,
    images: [
      "https://m.media-amazon.com/images/I/71RVuBs3q9L._SL1500_.jpg",
    ],
    seller: mockShops[0],
    rating: 4.8,
    reviewCount: 1200,
    specifications: {
      Display: '6.8" QHD+ Dynamic AMOLED 2X',
      Battery: "5000mAh",
      RAM: "12GB",
      Storage: "512GB",
      Camera: "200MP + 12MP + 10MP + 10MP",
      Processor: "Snapdragon 8 Gen 3",
    },
    description:
      "Samsung’s latest flagship with AI-powered camera, stunning display, and top-tier performance for pro users.",
  },
  {
    id: "p2",
    name: "HP Pavilion 15",
    brand: "HP",
    category: "Laptops",
    price: 62999,
    images: [
      product1,
    ],
    seller: mockShops[1],
    rating: 4.5,
    reviewCount: 860,
    specifications: {
      Display: '15.6" FHD IPS',
      Processor: "Intel Core i5 12th Gen",
      RAM: "16GB",
      Storage: "512GB SSD",
      Battery: "8 hours",
    },
    description:
      "The HP Pavilion 15 is designed for multitasking and creativity — combining portability and performance in a sleek chassis.",
  },
  {
    id: "p3",
    name: "boAt Rockerz 450 Pro Headphones",
    brand: "boAt",
    category: "Audio",
    price: 1999,
    images: [
      product2,
    ],
    seller: mockShops[0],
    rating: 4.3,
    reviewCount: 2500,
    specifications: {
      Battery: "70 Hours",
      Bluetooth: "v5.0",
      DriverSize: "40mm",
      Weight: "168g",
    },
    description:
      "Wireless Bluetooth headphones with long battery life, deep bass, and premium comfort for music lovers.",
  },
  {
    id: "p4",
    name: "Canon EOS 200D II DSLR Camera",
    brand: "Canon",
    category: "Cameras",
    price: 57999,
    images: [
      product3,
    ],
    seller: mockShops[2],
    rating: 4.6,
    reviewCount: 400,
    specifications: {
      Sensor: "24.1MP APS-C CMOS",
      Video: "4K UHD Recording",
      Lens: "EF-S 18-55mm IS STM",
      Display: "3.0-inch Vari-Angle Touchscreen",
      Connectivity: "WiFi, Bluetooth",
    },
    description:
      "Lightweight DSLR perfect for beginners and creators. Capture stunning photos and 4K videos with ease.",
  },
  {
    id: "p5",
    name: "Apple iPad 10th Gen",
    brand: "Apple",
    category: "Tablets",
    price: 42999,
    images: [
      "https://m.media-amazon.com/images/I/61uA2UVnYWL._SL1500_.jpg",
    ],
    seller: mockShops[1],
    rating: 4.7,
    reviewCount: 650,
    specifications: {
      Display: '10.9" Liquid Retina',
      Chip: "A14 Bionic",
      Storage: "256GB",
      Camera: "12MP Ultra Wide",
      Battery: "10 hours",
    },
    description:
      "The iPad 10th Gen delivers performance and creativity in a stunning design — perfect for students and professionals.",
  },
];

// 🧾 Mock Sellers (for SellerVerificationPage)
export const mockSellers = [
  {
    id: "s1",
    businessName: "Sri Electronics",
    ownerName: "Ravi Kumar",
    email: "ravi@srielectronics.com",
    phone: "9876543210",
    businessAddress: "Chengalpattu, Tamil Nadu",
    verificationStatus: "pending",
  },
  {
    id: "s2",
    businessName: "Tech Zone",
    ownerName: "Karthik",
    email: "karthik@techzone.in",
    phone: "9898989898",
    businessAddress: "SP Koil, Tamil Nadu",
    verificationStatus: "approved",
  },
  {
    id: "s3",
    businessName: "Mega Mobiles",
    ownerName: "Praveen",
    email: "praveen@megamobiles.in",
    phone: "9789078998",
    businessAddress: "Mahindra City, Tamil Nadu",
    verificationStatus: "approved",
  },
];

// 📦 Mock Orders (for SellerOrdersPage / MyOrdersPage)
export const mockOrders = [
  {
    id: "o1",
    product: mockProducts[0],
    buyer: "Gopiram",
    status: "Delivered",
    orderDate: "2025-10-01",
    total: 129999,
  },
  {
    id: "o2",
    product: mockProducts[1],
    buyer: "Avinash",
    status: "In Transit",
    orderDate: "2025-11-03",
    total: 62999,
  },
  {
    id: "o3",
    product: mockProducts[3],
    buyer: "Dinesh",
    status: "Processing",
    orderDate: "2025-11-04",
    total: 57999,
  },
];
