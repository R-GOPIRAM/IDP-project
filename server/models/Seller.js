import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  businessName: { type: String, required: true },
  businessAddress: { type: String, required: true },
  businessPhone: { type: String, required: true },
  gstin: { type: String },
  panNumber: { type: String },
  laborDeptCert: { type: String },
  documents: {
    aadhaar: String,
    pan: String,
    gstin: String,
    laborCert: String,
  },
  verificationStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rejectionReason: { type: String },
  approvedAt: { type: Date },
  rejectedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Seller", sellerSchema);
