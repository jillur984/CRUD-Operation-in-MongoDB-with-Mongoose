const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3002;

// create Products Schema by Mongoose
const productsSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  price: {
    type:Number,
    required:true
  },
  description: {
    type:String,
    required:true
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

// this method mongoDB connect by then & catch
// mongoose.connect("mongodb+srv://jillurr498:hm9Cuun2AjczCu48@jillur-db.7dqzy.mongodb.net/testProductDB")
// .then(()=>console.log("DB is Connected"))
// .catch((err)=>{
//     console.log("DB is not connected"),
//     console.log(err)
//     process.exit(1)
// })
app.get("/", (req, res) => {
  res.send("Hello I am From Server");
});

app.post("/products", async(req, res) => {
  try {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    // when insert many that time no need new Data
    const newData = new Product({
      title: title,
      price: price,
      description: description,
    });

    // const productData =await newData.save();

    // if i want to add product many that is ?

    const productData=await Product.insertMany([
      {
        title:"IPHONE 5",
        price:1450,
        description:"This is Famous Phone"
      },
      {
        title:"IPHONE 7",
        price:1550,
        description:"This is Famous Phone ever world"
      }
      , 
      {
        title:"IPHONE 9",
        price:1850,
        description:"This is Famous Phone and i like it"
      }
    ])

    res.status(201).send(productData);

  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.listen(PORT, async (req, res) => {
  console.log(`Server is Runnig at http://localhost:${PORT}`);
  await connectDB();
});
