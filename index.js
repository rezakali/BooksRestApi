const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const bookRoute = require("./routes/books")

const PORT = process.env.PORT || 3000;


/**MIDDLEWAREs */
app.use(express.json())
app.use(express.urlencoded({extended:true}))


/**Routes */
app.use("/api/books", bookRoute)

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
