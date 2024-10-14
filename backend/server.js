const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
  res.status(200).send("Express App is Running cool")
})




// APP CONFIG START
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
