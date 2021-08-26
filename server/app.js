const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const app = express();

const cors = require("cors");

const url =
  "mongodb+srv://kathiressan:kathiressan@cluster0.ghdng.mongodb.net/UserDatabase?retryWrites=true&w=majority";

app.use(cors());

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected"))
  .catch((e) => console.error(e));

app.get("/", (req, res) => {
  res.send(
    "randomeuser.me Mock API using MongoDB and Express. Hosted on Heroku."
  );
});

app.use(express.json());

app.use("/user", userRoutes);

app.listen(process.env.PORT || 8000);
