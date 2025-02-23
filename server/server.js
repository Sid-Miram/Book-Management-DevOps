const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectMongoDB = require("./config/database");
// const memberRoutes = require("./routes/memberRoutes"); // Uses MongoDB
const BookRoutes = require("./routes/bookRoutes"); // Uses SQL
// const issuanceRoutes = require("./routes/issuanceRoutes"); // Uses SQL

const User = require("./routes/Auth")
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:4500",
  "http://localhost:6000"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectMongoDB();


app.use('/', User);

app.use('/books', BookRoutes)


// // Routes
// app.use("/members", memberRoutes); // Users stored in MongoDB
// app.use("/books", bookRoutes); // Books stored in SQL
// app.use("/issuance", issuanceRoutes); // Issuance records stored in SQL

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
module.exports = app;
