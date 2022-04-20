//---------------------------------------------|
//           All required modules
//---------------------------------------------|
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const mongoose = require("mongoose");
const morgan = require("morgan");

//---------------------------------------------|
//                USE CONFIGS
//---------------------------------------------|
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();
app.use(cors());

//---------------------------------------------|
//              DatabaseConnection
//---------------------------------------------|
mongoose
  .connect(process.env.mongoURL)
  .then(() => console.log("database is connected".cyan))
  .catch((err) => console.log(err));

//---------------------------------------------|
//              IMPORT ROUTES
//---------------------------------------------|
const auth = require("./routes/authRoute");
const todo = require("./routes/todoRoutes");

//---------------------------------------------|
//                 USE ROUTE
//---------------------------------------------|
app.use("/auth", auth);
app.use("/todo", todo);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err, connection) => {
  if (err) console.log(err);
  console.log(`Auth app is serve on ${PORT}`.cyan);
});
