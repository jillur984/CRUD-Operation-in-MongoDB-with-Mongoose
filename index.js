const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3002;

// create Products Schema by Mongoose
const productsSchema=new mongoose.Schema({
  title:String,
  price:Number,
  description:String,
  createdAt:{
    type:Date,
    default:Date.now()
  }
})

const product=mongoose.model("products",productsSchema)



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

app.listen(PORT, async(req, res) => {
  console.log(`Server is Runnig at http://localhost:${PORT}`);
 await connectDB();
});
