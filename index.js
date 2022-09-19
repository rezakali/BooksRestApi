const express = require("express");
const mongoose = require("mongoose");
const { format } = require("winston");
const winston = require("winston");
const app = express();
require("dotenv").config();
const bookRoute = require("./routes/books");

const PORT = process.env.PORT || 3000;

/**MIDDLEWAREs */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**Logger for errors */
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({all:true})
      )
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

/**Routes */
app.use("/api/books", bookRoute);

/* COnNECT to mongodb atlas */
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    logger.info("Connected to mongo DB")
  })
  .catch((error) => {
    logger.error(error.message);
  });

/* START SERVER*/
app.listen(PORT, () => {
  logger.info("server running on port", PORT);
});
