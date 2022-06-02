const express = require("express");
const itemsSchema = require("../models/items");

const router = express.Router();

//create new item pet shop
/**
 *
 * @swagger
 * components:
 *  schemas:
 *   Items:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      description: the item name for each one
 *     productType:
 *      type: string
 *      description: wich type of product it is (pet, food, toy, other)
 *     description:
 *      type: string,
 *      descripton: you must put a product description here
 *     price:
 *      type: number
 *      description: for the amount each unit.
 *     stock:
 *      type: number
 *      description: the number of the stuck of items we have on stock
 *    required:
 *     -name
 *     -productType
 *     -description
 *     -price
 *     -stock
 *    example:
 *     name: Cat VegiFood
 *     productType: Food
 *     description: the best fresh vagifood for cats
 *     prices: 50
 *     stock: 30
 */

/**
 *
 * @swagger
 * /api/items:
 *  post:
 *   summary: create a new item
 *   tags: [Items]
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Items'
 *   responses:
 *    200:
 *      description: success item created
 */
router.post("/items", (req, res) => {
  const items = itemsSchema(req.body);
  items
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 *
 * @swagger
 * /api/items:
 *  get:
 *   summary: return all items
 *   tags: [Items]
 *   responses:
 *    200:
 *      description: success all items created
 *      content:
 *        application/json:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Items'
 *
 */
//get all items pet shop
router.get("/items", (req, res) => {
  itemsSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 *
 * @swagger
 * /api/items/{id}:
 *  get:
 *   summary: return one item
 *   tags: [Items]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: the item id
 *   responses:
 *    200:
 *      description: all items
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Items'
 *   404:
 *    description: item not found by id
 *
 */
//get the specific item by ID
router.get("/items/:id", (req, res) => {
  const { id } = req.params;
  itemsSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 *
 * @swagger
 * /api/items/{id}:
 *  put:
 *   summary: update one item
 *   tags: [Items]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: the item id
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Items'
 *   responses:
 *    200:
 *      description: update the item
 *   404:
 *    description: item not found
 *
 */
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

/**
 *
 * @swagger
 * /api/items/{id}:
 *  delete:
 *   summary: delete a item
 *   tags: [Items]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: the item id
 *   responses:
 *    200:
 *      description: the item was deleted
 *   404:
 *    description: item not found  was deleted
 *
 */
//Deleted item is the item it's not loger a supplier mamber
router.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  itemsSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
