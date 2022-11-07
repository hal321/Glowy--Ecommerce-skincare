const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bagSchema = new Schema(
  [
    {
      category: String,
      brand: String,
      price: Number,
    },
  ],
  { timestamps: true }
);

const Bag = mongoose.model("Bag", bagSchema);

module.exports = Bag;
