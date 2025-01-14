import mongoose, { mongo } from "mongoose";
mongoose
  .connect(
    "mongodb+srv://Zhiperus:FRTAtGWQtSzo2zpW@cluster0.cty4y.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch(() => {
    console.log("Connection failed.");
  });

const newSchema = new mongoose.Schema({
  image: {
    type: Buffer,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  diets: {
    type: Array,
    required: true,
  },
});

const collection = mongoose.model("users", newSchema);

export default collection;
