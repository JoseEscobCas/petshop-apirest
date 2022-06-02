const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  productType: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("items", itemsSchema);
