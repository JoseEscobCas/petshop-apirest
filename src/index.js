const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const useRoutes = require("./routes/items-petShop");
const path = require("path");

//swagger suport
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PETSHOP API REST",
      version: "0.0.1",
    },
    servers: [
      {
        url: "http://localhost:3700",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/items-petShop.js")}`],
};

const app = express();
const port = process.env.PORT || 3700;

//midlewares
app.use(express.json());
app.use("/api", useRoutes);
app.use(
  "/api-doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerSpec))
);

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
