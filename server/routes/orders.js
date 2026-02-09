import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Seller from "../models/Seller.js";
import { auth, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { items, deliveryAddress, deliveryType, paymentMethod } = req.body;

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId).populate("sellerId");
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product?.name || "product"}` });
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        productId: product._id,
        sellerId: product.sellerId._id,
        productName: product.name,
        sellerName: product.sellerId.businessName,
        quantity: item.quantity,
        price: product.price,
        subtotal,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    if (deliveryType === "delivery") {
      totalAmount += 50;
    }

    const order = new Order({
      customerId: req.user._id,
      customerName: req.user.name,
      customerEmail: req.user.email,
      customerPhone: req.body.customerPhone,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      deliveryType,
      paymentMethod,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/seller-orders", auth, authorize("seller"), async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.user._id });
    const orders = await Order.find({ "items.sellerId": seller._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.patch("/:id/status", auth, authorize("seller", "admin"), async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    if (status === "shipped") {
      order.trackingNumber = `TRK${Date.now()}`;
    }

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
