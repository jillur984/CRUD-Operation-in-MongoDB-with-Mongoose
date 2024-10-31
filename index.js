const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3002;

// create Products Schema by Mongoose
const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("products", productsSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connet mongoDB by Async Function

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jillurr498:hm9Cuun2AjczCu48@jillur-db.7dqzy.mongodb.net/testProductDB"
    );

    console.log("DB is connected");
  } catch (error) {
    console.log("DB is not conneted");
    console.log(error.message);
    process.exit();
  }
};

app.get("/", (req, res) => {
  res.send("Hello I am From Server");
});

//creat new Products

app.post("/products", async (req, res) => {
  try {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    const newData = new Product({
      title: title,
      price: price,
      description: description,
    });

    const productData = await newData.save();

    res.status(201).send(productData);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// get new products

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    // if i want only 2 data
    // const products=await Product.find().limit(2)
    if (products) {
      res.status(200).send({
        success: true,
        message: "Return all products",
        data: products,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// search a product by ID

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;

  // find return a array but find one return a object
  //  const products=await Product.find({_id:id}) // return a array
  //  const products=await Product.findOne({_id:id}) // return a object

  // if i want to show specific item
  const product = await Product.find({ _id: id }).select({
    title: 1,
    _id: 0,
    price: 1,
  });
  if (product) {
    try {
      res.status(200).send({
        success: true,
        message: "Return a single Product",
        data: product,
      });
    } catch (error) {
      res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
  }
});

app.listen(PORT, async (req, res) => {
  console.log(`Server is Runnig at http://localhost:${PORT}`);
  await connectDB();
});

// database---collection---documents

//GET:/products---Return all products
//GET:/products/:id---Return a specific product
//POST:/products---create a product
//PUT:/products/:id---update a product based on id
//DELETE:/products/:id-delete a product based on id.
