const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("./models/User");
const Product = require("./models/Products");
const Cart = require("./models/Cart");
const Wishlist = require("./models/Wishlist");
const Order = require("./models/Order");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET 
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const app = express();
app.use(cors({
  origin: ["https://nextgen-str.shop",
  "https://www.nextgen-str.shop",
  "https://nextgenstr.netlify.app",
  "http://localhost:5173"],
}));app.use(express.json());

// MongoDB
mongoose.connect(MONGO_URI).then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

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

  if (!email || !password) {
    return res.status(400).json({ message: "Email болон нууц үгээ оруулна уу" });
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "Бүртгүүлээгүй хэрэглэгч. Шинээр бүртгүүлнэ үү" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ message: "Нууц үг буруу байна" });
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
    const { email, username, password, role } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "Email, username болон нууц үгээ оруулна уу" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email аль хэдийн бүртгэгдсэн байна" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      verificationCode: code,
      verificationCodeExpires: Date.now() + 5 * 60 * 1000,
      isVerified: false,
      role: role || 'user'
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "NextGen - Бүртгэл баталгаажуулах код",
      text: `Таны бүртгэл баталгаажуулах код: ${code}. Энэ код 5 минутын хугацаанд хүчинтэй.`
    });


    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role || 'user'
    }

    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: "2h" });

    res.status(201).json({message: "Амжилттай бүртгэлээ. Бүртгэл баталгаажуулах код таны и-мэйлд илгээгдлээ.", token , user: userData });
  } catch (error) {
    console.error('error:', error);

    res.status(500).json({
      message: "Error registering user",
    });
  }
});

// GET PRODUCTS
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    if(!products || products.length === 0) {
      return res.status(200).json({ message: "No products found" });
    }

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

    if (address !== undefined) updateData.address = address;
    if (phone !== undefined)  updateData.phone = phone;
    if (email !== undefined) updateData.email = email;


    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({message: "User олдсонгүй"});
    }

    res.status(200).json({message: "Амжилттай хадгаллаа",user});

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
    const orders = await Order.find()

    res.status(200).json({ products, users, orders });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Admin data авахад алдаа гарлаа"
    });
  }
});

// cart 
app.post("/api/cart", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id

  try{
    let cart = await Cart.findOne({ userId });

    if(!cart){
      cart = await Cart.create({
        userId: userId,
        products: [{ productId, quantity }]
      })
    }
    else{
      const existingProduct = cart.products.find(item => item.productId.toString() === productId);
      if(existingProduct){
        existingProduct.quantity += quantity;
      }
      else{
        cart.products.push({ productId, quantity });
      }
      await cart.save();
      res.status(200).json({ message: "Сагс шинэчлэгдлээ", cart });
    }  
    }  catch (error) {
      console.error(error);
      res.status(500).json({ message: "Сагсанд нэмэхэд алдаа гарлаа" });
    }
  })
 
app.get("/api/cart", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId }).populate("products.productId");

  try{
    if(userId !== req.user.id) {
      return res.status(403).json({ message: "Танд энэ үйлдлийг хийх эрх байхгүй" });
    }

    if(!cart) {
      return res.status(200).json({ message: "Сагс хоосон байна", products: [] });
    }

    const user = await User.findById(userId).select("-password");

    if(!cart) {
      return res.status(404).json({ message: "Сагс хоосон байна" });
    }
    else{
      res.status(200).json({ user: user, products: cart.products });
      
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Сагс авахад алдаа гарлаа" });
  }
})

app.put("/api/cart", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId });

  try{
    if(!cart) {
      return res.status(404).json({ message: "Сагс хоосон байна" });
    }
    else{
      const existingProduct = cart.products.find(item => item.productId.toString() === productId);
      if(existingProduct){
        existingProduct.quantity = quantity;
        await cart.save();
        res.status(200).json({ message: "Сагс шинэчлэгдлээ", cart });
      }
      else{
        return res.status(404).json({ message: "Бараа сагсанд байхгүй байна" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Сагс шинэчлэхэд алдаа гарлаа" });
  }
})

app.delete("/api/cart", verifyToken, async (req, res) => {
  const { productId } = req.body;
  try{
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if(!cart) {
      return res.status(404).json({ message: "Сагс хоосон байна" });
    }
    else{
      const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
      if(existingProductIndex !== -1){
        cart.products.splice(existingProductIndex, 1);
        await cart.save();
        res.status(200).json({ message: "Сагснаас устгагдлаа", cart });
      }
      else{
        return res.status(404).json({ message: "Бараа сагсанд байхгүй байна" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Сагснаас устгахад алдаа гарлаа" });
  }
})

//wishlist
app.post("/api/wishlist", verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);


    if (!user) {
      return res.status(404).json({
        message: "User олдсонгүй"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Бараа олдсонгүй"
      });
    }

    // Давхар нэмэхээс хамгаална
    const existingWishlist = await Wishlist.findOne({productId, userId });

    if (existingWishlist) {
      return res.status(400).json({
        message: "Энэ бараа wishlist-д аль хэдийн байна"
      });
    }

    const wishlist = await Wishlist.create({
      userId,
      productId
    });

    return res.status(201).json({
      message: "Wishlist-д амжилттай нэмэгдлээ",
      wishlist
    });

  } catch (error) {
    console.error("ADD WISHLIST ERROR:", error);

    return res.status(500).json({
      message: "Wishlist нэмэхэд алдаа гарлаа"
    });
  }
});

app.delete("/api/wishlist", verifyToken, async (req, res) => {
  
  try{
    const { productId } = req.body;
    const userId = req.user.id;
    const wishlistItem = await Wishlist.findOne({ userId, productId });
  if (!wishlistItem) {
    return res.status(404).json({
    message: "Энэ бараа wishlist-д байхгүй байна"
  });
}

  await Wishlist.findByIdAndDelete(wishlistItem._id);  
  return res.status(200).json({ message: "Wishlist-аас амжилттай устгагдлаа" });
  }catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Wishlist-аас устгахад алдаа гарлаа" });
    }
  })

app.get("/api/wishlist", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try{
    const wishlistItems = await Wishlist.find({ userId }).populate("productId");
    res.status(200).json(wishlistItems);
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Wishlist авахад алдаа гарлаа" });
  }
})


app.get("/api/userinfo", verifyToken, async (req, res) => {
  try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({ message: "User олдсонгүй" });
    }

    res.status(200).json(user); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "User info авахад алдаа гарлаа" });
  }
})

//get product detail 
app.get("/api/product/:id", async (req, res) => {
  try{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(!product){
      return res.status(404).json({ message: "Бараа олдсонгүй" });
    }
    res.status(200).json(product)
  }
  catch(error){
    console.error(error);
    return res.status(500).json({ message: "Бараа detail авахад алдаа гарлаа" });
  }
})

app.put("/api/user/update/:id", verifyToken, async (req, res) => {
  try{
    const userId = req.params.id;
    if(userId !== req.user.id) {
      return res.status(403).json({ message: "Танд энэ үйлдлийг хийх эрх байхгүй" });
    }
    const { username, email, address, phone } = req.body;
    const updateData = {};
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (address !== undefined) updateData.address = address;
    if (phone !== undefined) updateData.phone = phone;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
    if(!user){
      return res.status(404).json({ message: "User олдсонгүй" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "User мэдээллийг шинэчлэхад алдаа гарлаа" });
  }
})

app.post("/api/order", verifyToken, async (req, res) => {
  try{
    const { products, totalAmount, description } = req.body;
    const userId = req.user.id;

    if(!products || !totalAmount) {
      return res.status(400).json({ message: "Бараа болон нийт дүнг оруулна уу" });
    }

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if(!product){
      return res.status(404).json({ message: `Бараа олдсонгүй: ${item.productId}` });
    }

    if(product.count < item.quantity){
      return res.status(400).json({ message: `Бараа хүрэлцэхгүй: ${item.productId}` });
    }

    product.count -= item.quantity;
    product.sold += item.quantity;

    await product.save();
    }

    const order = await Order.create({
      userId,
      products,
      totalAmount,
      description,
      paymentStatus: 'pending',
      orderStatus: 'processing'
    })

    await Cart.findOneAndDelete({ userId });
    
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order үүсгэхад алдаа гарлаа" });
  }
})

app.put("/api/product/:id", verifyToken, verifyAdmin, async (req, res) => {
  try{
    const productId = req.params.id;
    const { name, description, price, image, category, count, status } = req.body;

    const updateData = {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(price !== undefined && { price }),
      ...(image !== undefined && { image }),
      ...(category !== undefined && { category }),
      ...(count !== undefined && { count }),
      ...(status !== undefined && { status })
    }

    const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if(!product){
      return res.status(404).json({ message: "Бараа олдсонгүй" });
    }
    res.status(200).json(product);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Бараа шинэчлэхэд алдаа гарлаа" });
  }
})

app.get("/api/orders", verifyToken, async (req, res) => {
  try{
    const userId = req.user.id;

    const orders = await Order.find({ userId }).populate("products.productId");
    res.status(200).json(orders);

     console.log("ORDERS:", JSON.stringify(orders, null, 2));
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Orders авахад алдаа гарлаа" });
  }
})

app.delete("/api/products/:id", verifyToken, async (req, res) => {
  try{
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if(!product){
      return res.status(404).json({ message: "Бараа олдсонгүй" });
    }
    res.status(200).json({ message: "Бараа устгагдлаа" });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Бараа устгахад алдаа гарлаа" });
  }
});

app.get("/api/admin/orders", verifyToken, verifyAdmin, async (req, res) => {
  try{
    const orders = await Order.find().populate("products.productId").populate("userId", "-password");
    res.status(200).json(orders);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Admin orders авахад алдаа гарлаа" });
  }
});

app.put("/api/admin/orders/:id", verifyToken, verifyAdmin, async (req, res) => {
  try{
    const orderId = req.params.id;
    const { paymentStatus, orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(orderId, { paymentStatus, orderStatus, updatedAt: new Date() }, { new: true });
    if(!order){
      return res.status(404).json({ message: "Захиалга олдсонгүй" });
    }
    res.status(200).json(order);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Захиалга шинэчлэхэд алдаа гарлаа" });
  }
});

app.post("/api/verify-email", async (req, res) => {
  try {
    const { userId, code } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Хэрэглэгч олдсонгүй",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email аль хэдийн баталгаажсан байна",
      });
    }

    if (!user.verificationCode) {
      return res.status(400).json({
        message: "Баталгаажуулах код байхгүй байна",
      });
    }

    if (new Date() > user.verificationCodeExpires) {
      return res.status(400).json({
        message: "Кодын хугацаа дууссан байна",
      });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({
        message: "Баталгаажуулах код буруу байна",
      });
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;

    await user.save();

    res.json({
      message: "Email амжилттай баталгаажлаа",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Email баталгаажуулахад алдаа гарлаа",
    });
  }
});

app.get("/test", (req, res) => {
  res.send("Express is working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
