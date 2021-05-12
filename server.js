// import
const express = require("express");
const app = express();
const session = require("express-session");
require("dotenv").config();
// import Files
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");

// PORT, mongoose,
const PORT = process.env.PORT;
const localhost = process.env.localhost;
const mongoose = require("mongoose");

// Settings

// MongoDB setup and mongoose connection
const DB_NAME = process.env.DB_NAME;
const DB_LINK = process.env.MONGO_LINK + DB_NAME;

mongoose
  .connect(DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Mongoose is connected with MongoDB \u{1F60E}`);
  })
  .catch((err) => {
    console.log(`Mongoose lost MongoDB \u26A0\uFE0F`);
  });

// Static
app.use(express.static(__dirname + "/public"));
// hbs
app.set("view engine", "hbs");
// body parser
app.use(
  express.urlencoded({
    extended: false,
  })
);

// express-session
app.use(
  session({
    secret: process.env.MY_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// Routes
// app.use("/", indexRouter);
// app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("WElcome to Instagram");
});

// Error handling
app.get("*", (req, res) => {
  res.render("error");
});
// Listen
app.listen(PORT, () => {
  console.log(`Serve is listening in PORT: ${localhost}:${PORT}`);
});
