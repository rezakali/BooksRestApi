const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

/* COnNECT to mongodb atlas */
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
  console.log("connected to mongodb");
}).catch(error => {
    console.log("Something Went Wrong", error)
})

/* START SERVER*/
app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
