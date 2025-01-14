import express from "express";
import cors from "cors";
import collection from "./mongoose.js";
import mongoose from "mongoose";
import multer from "multer";
const app = express();
const upload = multer();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), async (req, res) => {
  const { email, password } = req.query;

  try {
    const check = await collection.findOne({ email: email });

    if (check != null) {
      const { _id, image, name, diets } = check;

      if (check.password === password) {
        res.json({
          status: "success",
          image: image,
          _id: _id,
          name: name,
          diets: diets,
        });
      } else {
        res.status(401).send("Password is incorrect!");
      }
    } else {
      res.status(404).send("User does not exist!");
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/signup", upload.single("image"), async (req, res) => {
  const { name, email, password } = req.body;

  const image = req.file.buffer;

  const data = {
    image: image,
    name: name,
    email: email,
    password: password,
    diets: [],
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.status(409).send("User already exists!");
    } else {
      const response = await collection.insertMany([data]);

      res.json({
        status: "success",
        _id: response[0]._id,
        name: name,
        image: response[0].image,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

app.put("/logout", async (req) => {
  const { _id, diets } = req.body;

  try {
    await collection.updateOne(
      { _id: new mongoose.Types.ObjectId(_id) },
      { $set: { diets: diets } }
    );
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000, () => {
  console.log("Listening to port 3000...");
});
