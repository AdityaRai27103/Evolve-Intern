const express = require("express");
const path = require("path");
require("./db/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");
const app = express();
const mongoose = require("mongoose");
const port = process.env.port || 5000;

//setting the path
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../Templates/views");
const partialpath = path.join(__dirname, "../Templates/partials");

//middleware
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

//routing
//"NewUser", app.get(path, callback)
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/contact", async (req, res) => {
  try {
    console.log(req.body);
    const userData = new User(req.body);
    const newUser = await userData.save();
    console.log("NewUser", newUser);
    // res.send(newUser);
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

//server create
mongoose
  .connect(
    "mongodb+srv://EvolveIntern:EvolveIntern01623@cluster0.pfih4bu.mongodb.net/Evolve?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection Established Successfuly.");
    app.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  })
  .catch((error) => console.log("No-Connection"));
