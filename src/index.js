const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const useRoutes = require("./routes/items-petShop");

const app = express();
const port = process.env.PORT || 3700;

//midlewares
app.use(express.json());
app.use("/api", useRoutes);

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to petShop API");
});

//mongoDB conexion here using moongose
mongoose
  .connect(process.env.mongodb_uri)
  .then(() => console.log("Connected to mongoDB Altas"))
  .catch((error) => console.log(error));

app.listen(port, () => console.log("server lisening on port: ", port));
