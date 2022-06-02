const express = require("express");
const itemsSchema = require("../models/items");

const router = express.Router();

//create new item pet shop
router.post("/items", (req, res) => {
  const items = itemsSchema(req.body);
  items
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get all items pet shop
router.get("/items", (req, res) => {
  itemsSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get the specific item by ID
router.get("/items/:id", (req, res) => {
  const { id } = req.params;
  itemsSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//update each item to update the description, price, name and more
router.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, productType, description, price, stock } = req.body;
  itemsSchema
    .updateOne(
      { _id: id },
      { $set: { name, productType, description, price, stock } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Deleted item is the item it's not loger a supplier mamber
router.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  itemsSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
