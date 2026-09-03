const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/ecommerce-nextgen")
  .then(async () => {
    const hashedPassword = bcrypt.hashSync("admin05233033", 10);

    await User.create({
      username: "admin",
      email: "admin@admin.nextgen",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created successfully");

    mongoose.connection.close();
  })
 