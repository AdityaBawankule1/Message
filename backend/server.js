require("dotenv").config();

const express =
require("express");

const cors =
require("cors");

const connectDB =
require("./config/db");

const contactRoutes =
require("./routes/contactRoutes");

connectDB();

const app =
express();

app.use(cors());

app.use(express.json());

app.use(
 "/api/contact",
 contactRoutes
);

app.listen(
 process.env.PORT,
 ()=>{
  console.log(
   "Server running"
  );
 }
);