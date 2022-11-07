const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const seed = require("./models/seed");
const Glowy = require("./models/glowySchema");

// const usersSeed = require("./models/usersSeed");
const app = express();
const PORT = process.env.PORT || 3001;

const mongoURI = "mongodb+srv://hal:someone@cluster0.aapxkio.mongodb.net/glowy";
const db = mongoose.connection;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("listening to beauty port", PORT);
    });

    //  User.insertMany(usersSeed, (err, users) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log("added provided", users);
    //    //mongoose.connection.close();
    //   });
    // Glowy.insertMany(seed, (err, products) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log("added provided", products);
    //  //mongoose.connection.close();
    // });
  })
  .catch((err) => {
    console.log(err);
  });
//, () => {
//   console.log("connection with mongoose is established");
// });

// db.on("error", (err) => {
//   console.log("err while connectiong to mongo" + err.message);
// });

// db.on("disconnected", () => {
//   console.log("mongo db disconnected");
// });

const userController = require("./controllers/users.js");
const sessionController = require("./controllers/sessions.js");
const productController = require("./controllers/products");
const adminUsers = require("./controllers/adminUsers");
//const checkIsLoggedIn = require("./middleware/checklogin");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "gotasecertcanukeepit",
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/users", userController);
app.use("/sessions", sessionController);
app.use("/products", productController);
app.use("/adminUsers", adminUsers);

app.get("/", (req, res) => {
  res.render("index.ejs", { userDetails: req.session.currentUser });
});
