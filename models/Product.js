const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  hsCode: String,
  description: String,
  originCountry: String,
  dischargePort: String,
  unit: String,
  quantity: String,
  perUnit: Number,
  value: Number,
  date: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);
