const express = require("express");
require("dotenv").config();
const sequelize = require("./config/database");

const memberRoutes = require("./routes/memberRoutes");
const bookRoutes = require("./routes/bookRoutes");
const issuanceRoutes = require("./routes/issuanceRoutes");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

// Routes
app.use("/members", memberRoutes);
app.use("/books", bookRoutes);
app.use("/issuance", issuanceRoutes);


sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("Error: " + err));
