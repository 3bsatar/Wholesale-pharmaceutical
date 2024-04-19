const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    enum: ["Tons", "KGM", "GM", "Cm", "Meter", "Box", "Packages"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
