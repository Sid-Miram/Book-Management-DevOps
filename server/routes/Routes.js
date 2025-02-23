const express = require("express");
require("dotenv").config();
const app = express(); // Initialize Express
const User = require("./Auth")
const memberRoutes = require("./memberRoutes");
const bookRoutes = require("./bookRoutes");
const issuanceRoutes = require("./issuanceRoutes")
const categoryRoutes = require("./categoryRoutes")
const membershipRoutes = require("./membershipRoutes")
const collectionRoutes = require("./collectionRoutes")

app.use(express.json());

app.use("/user", User);
app.use("/books", bookRoutes);
app.use("/members", memberRoutes);
app.use("/issuance", issuanceRoutes);
app.use("/category", categoryRoutes)
app.use("/membership", membershipRoutes)
app.use("/collection", collectionRoutes)

module.exports = app;
