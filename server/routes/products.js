const express = require('express');
const Product = require('../models/Product');
const Seller = require('../models/Seller');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sortBy, page = 1, limit = 20 } = req.query;
    
    let query = { isAvailable: true };
    
    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Search filter
    if (search) {
      query.$text = { $search: search };
    }
    
    // Sort options
    let sort = {};
    switch (sortBy) {
      case 'price-low':
        sort.price = 1;
        break;
      case 'price-high':
        sort.price = -1;
        break;
      case 'rating':
        sort.rating = -1;
        break;
      case 'newest':
        sort.createdAt = -1;
        break;
      default:
        sort.createdAt = -1;
    }
    
    const products = await Product.find(query)
      .populate('sellerId', 'businessName businessAddress')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('sellerId', 'businessName businessAddress businessPhone');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create product (sellers only)
router.post('/', auth, authorize('seller'), async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.user._id });
    if (!seller || seller.verificationStatus !== 'approved') {
      return res.status(403).json({ message: 'Seller not verified' });
    }
    
    const product = new Product({
      ...req.body,
      sellerId: seller._id
    });
    
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product
router.put('/:id', auth, authorize('seller'), async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.user._id });
    const product = await Product.findOne({ _id: req.params.id, sellerId: seller._id });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    Object.assign(product, req.body);
    await product.save();
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product
router.delete('/:id', auth, authorize('seller'), async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.user._id });
    const product = await Product.findOneAndDelete({ _id: req.params.id, sellerId: seller._id });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

// ----------------------
// Nearby Recommendations
// ----------------------
router.get('/recommendations/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const nearbyProducts = await Product.find({
      'sellerAddress': { $regex: location, $options: 'i' },
      isAvailable: true
    })
      .populate('sellerId', 'businessName businessAddress')
      .limit(10);

    res.json({
      message: `Products available near ${location}`,
      count: nearbyProducts.length,
      products: nearbyProducts
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch nearby products', error: error.message });
  }
});

// ----------------------
// Bargain Chat Prototype
// ----------------------
router.post('/:id/bargain', async (req, res) => {
  try {
    const { offerPrice, username } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id).populate('sellerId', 'businessName businessAddress');
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const shopResponse = simulateBargain(product.price, offerPrice);

    res.json({
      product: product.name,
      yourOffer: offerPrice,
      shopResponse,
      message: `Negotiation result for ${product.name}`
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during bargaining', error: error.message });
  }
});

// Helper function for simulated bargain logic
function simulateBargain(originalPrice, offerPrice) {
  const minAcceptable = originalPrice * 0.85; // seller won't go below 85%
  if (offerPrice >= originalPrice) {
    return `Shop says: Deal confirmed at ₹${offerPrice}!`;
  } else if (offerPrice >= minAcceptable) {
    const counterOffer = Math.floor((offerPrice + originalPrice) / 2);
    return `Shop says: I can offer ₹${counterOffer}. Do we have a deal?`;
  } else {
    return `Shop says: Too low! Minimum acceptable is around ₹${Math.floor(minAcceptable)}.`;
  }
}
