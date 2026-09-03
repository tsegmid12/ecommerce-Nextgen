const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Product = require("./models/Products");

const app = express();
const PORT = 5000;

const JWT_SECRET = "tsegmid0330"
let userToken;


app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect("mongodb://localhost:27017/ecommerce-nextgen")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

  const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token байхгүй"
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Bearer token буруу байна"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    console.error("JWT ERROR:", error.message);

    return res.status(401).json({
      message: "Token буруу эсвэл хугацаа дууссан"
    });
  }
};

//verify admin role
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: "Admin эрх шаардлагатай"
    });
  }
  next();
};

// LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const userData = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role || 'user'
      };
      const token = jwt.sign(userData, JWT_SECRET, { expiresIn: "2h" });

      res.status(200).json({ message: "Login successful", token, user });
    });
  });
});

// REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      role: 'user'
    });

    userToken = jwt.sign({_id: user._id, username: user.username, email: user.email, phone: user.phone || '', address: user.address || '' , role: user.role || 'user'}, JWT_SECRET, { expiresIn: "2h" });

    res.status(201).json({message: "Амжилттай бүртгэлээ", token });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error registering user",
    });
  }
});

// GET PRODUCTS
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Products авахад алдаа гарлаа",
    });
  }
});

// ADD PRODUCT
app.post("/api/products", async (req, res) => {
  try {
    const {name, description, price, image, category, count, status, sold} = req.body;
    if(!name || !description || !price || !image || !category || !count || !status) {
      return res.status(400).json({ message: "Бүх талбарыг бөглөнө үү" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      count,
      status,
      sold
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Products нэмэхад алдаа гарлаа",
    });
  }
})

//ADD USER INFO
app.post("/api/userinfo", verifyToken, async (req, res) => {
  try {
    const { address, phone, email } = req.body;

    const updateData = {};

    if (address !== undefined) {
      updateData.address = address;
    }

    if (phone !== undefined) {
      updateData.phone = phone;
    }

    if (email !== undefined) {
      updateData.email = email;
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User олдсонгүй"
      });
    }

    res.status(200).json({
      message: "Амжилттай хадгаллаа",
      user
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "User info шинэчлэхэд алдаа гарлаа"
    });
  }
});

app.get("/api/admin", verifyToken, verifyAdmin ,  async (req, res) => {
  try {
    const products = await Product.find();
    const users = await User.find();

    res.status(200).json({ products, users });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Admin data авахад алдаа гарлаа"
    });
  }
});

app.get("/test", (req, res) => {
  res.send("Express is working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});