const express = require("express");
const app = express();
const clients = require("./components/clients/network");
const orders = require("./components/orders/network");
const payments = require("./components/payments/network");
const permissions = require("./components/permissions/network");
const products = require("./components/products/network");
const shipments = require("./components/shipments/network");
const spotifys = require("./components/spotifys/network");
const texts = require("./components/texts/network");
const users = require("./components/users/network");

const productphotos = require("./components/photos/productphotos/network");
const orderphotos = require("./components/photos/orderphotos/network");
const voucherphotos = require("./components/photos/voucherphotos/network");
const clientphotos = require("./components/photos/clientphotos/network");
const designphotos = require("./components/photos/designphotos/network");


const morgan = require("morgan");
var cors = require('cors')

//Settings
app.set("port", process.env.PORT || 3000)

//Middlewares
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use("/api/clients", clients);
app.use("/api/orders", orders);
app.use("/api/payments", payments);
app.use("/api/permissions", permissions);
app.use("/api/products", products);
app.use("/api/shipments", shipments);
app.use("/api/spotifys", spotifys);
app.use("/api/texts", texts);
app.use("/api/users", users);
app.use("/api/productphotos", productphotos);
app.use("/api/orderphotos", orderphotos);
app.use("/api/voucherphotos", voucherphotos);
app.use("/api/clientphotos", clientphotos);
app.use("/api/designphotos", designphotos);

app.listen(app.get("port"), () => {
    console.log("Server on port: ", app.get("port"));
})