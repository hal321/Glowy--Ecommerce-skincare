const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const glowySchema = new Schema(
  {
    category: String,
    skinType: String,
    dayNight: String,
    brand: { type: String, required: true },
    description: String,
    img: String,
    price: { type: Number, min: 5, required: true },
    qty: { type: Number, min: 0 },
  },
  { timestamps: true }
);

const Glowy = mongoose.model("Glowy", glowySchema);

module.exports = Glowy;
