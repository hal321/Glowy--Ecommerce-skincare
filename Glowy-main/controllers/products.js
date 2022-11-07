const express = require("express");
const router = express.Router();

const Glowy = require("../models/glowySchema.js");
const Bag = require("../models/bagSchema");

let arr = [];
// const Cart = require("../models/cartSchema.js");

router.get("/", (req, res) => {
  if (req.session.currentUser) {
    Glowy.find({}, (err, products) => {
      if (err) {
        console.log(err);
      }
      res.render("./products/index", {
        products,
        role: req.session.currentUser.role,
      });
    });
  } else {
    res.redirect("/sessions/new");
  }
});

router.get("/contactus", (req, res) => {
  res.render("products/contact");
});
router.get("/admin", (req, res) => {
  if (req.session.currentUser) {
    res.render("./products/admin", {
      role: req.session.currentUser.role,
    });
  } else {
    res.redirect("/sessions/new");
  }
});
router.get("/new", (req, res) => {
  if (req.session.currentUser) {
    res.render("./products/new", {
      role: req.session.currentUser.role,
    });
  } else {
    res.redirect("/sessions/new");
  }
});

router.get("/cart", (req, res) => {
  res.render("products/cart.ejs", {
    role: req.session.currentUser.role,
    cart: arr,
  });
});

router.get("/cart/:category/:brand/:price", (req, res) => {
  arr.push({
    category: req.params.category,
    brand: req.params.brand,
    price: req.params.price,
  });
});

router.post("/cart", (req, res) => {
  Bag.create(arr, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/products/checkout");
    }
  });
});

router.get("/checkout", (req, res) => {
  res.render("products/checkout.ejs", {
    role: req.session.currentUser.role,
    checkout: arr,
  });
});

router.get("/:id", (req, res) => {
  Glowy.findById(req.params.id, (err, product) => {
    if (err) {
      console.log(err);
    }
    res.render("./products/show", {
      product,
      role: req.session.currentUser.role,
    });
  });
});

router.post("/", (req, res) => {
  Glowy.create(req.body, (err, product) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/products/" + product.id);
    }
  });
});

router.get("/:id/edit", (req, res) => {
  Glowy.findById(req.params.id, (err, product) => {
    if (err) {
      console.log(err);
    }
    res.render("./products/edit.ejs", { product: product });
  });
});

router.put("/:id", (req, res) => {
  Glowy.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, product) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/products/" + product.id);
    }
  );
});

router.delete("/:id", (req, res) => {
  Glowy.findByIdAndRemove(req.params.id, (err, product) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/products");
  });
});

router.delete("/cart/:id", (req, res) => {
  arr.splice(req.params.id, 1);
  
  res.redirect("/products/cart");
});
//   Bag.findByIdAndRemove(req.params.id, (err, product) => {
//     if (err) {
//       console.log(err);
//     }
//   res.redirect("/products/cart");
// });
router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
