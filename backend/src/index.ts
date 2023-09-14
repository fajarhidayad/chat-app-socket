import express from "express";
import routes from "./routes";
import { connect, connection } from "mongoose";

import "dotenv/config";

import { errorHandler, errorNotFound } from "./middlewares/errorMiddleware";
import CustomError from "./helpers/CustomError";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Works");
});

app.use("/api/v1", routes);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find the requested ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});
app.use(errorHandler);
app.use(errorNotFound);

const PORT = process.env.PORT || 5001;
const URI =
  process.env.NODE_ENV === "DEVELOPMENT"
    ? process.env.MONGO_DB_URI_DEV
    : process.env.MONGO_DB_URI;

const start = async () => {
  try {
    await connect(URI as string);
    connection.once("open", () => console.log("Connected to db"));

    app.listen(PORT, async () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
