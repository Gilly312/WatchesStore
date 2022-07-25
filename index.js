const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use("/product", express.static(__dirname + "/public"));
app.use("/product/brand", express.static(__dirname + "/public"));

app.use("/product/filter", express.static(__dirname + "/public"));
app.use("/product/filter/male", express.static(__dirname + "/public"));

app.use("/product/filter/female", express.static(__dirname + "/public"));
app.use("/account", express.static(__dirname + "/public"));
app.use("/cart", express.static(__dirname + "/public"));
app.use("/admin", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "khoa",
    resave: false,
    saveUninitialized: true,
    cookie: { secret: false },
  })
);

//-------------------------GOOGLE LOGIN CONFIG------------------------------

app.use(passport.initialize());
app.use(passport.session());

require("./oauth");

app.use("/oauth/google", require("./route/google"));

//-------------------------GOOGLE LOGIN CONFIG------------------------------

app.get("/", (req, res) => {
  res.redirect("dashboard");
});
app.use("/dashboard", require("./route/dashboard"));
app.use("/product", require("./route/product"));
app.use("/account", require("./route/account"));
app.use("/admin", require("./route/admin"));
app.use("/cart", require("./route/cart"));

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("Connected");
    app.listen(process.env.PORT || 8080, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  })
  .catch((e) => console.log("Can't connect to database " + e.messages));
