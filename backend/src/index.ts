import express from "express";
import routes from "./routes";
import { connect, connection } from "mongoose";

import "dotenv/config";

import { errorNotFound } from "./middlewares/errorMiddleware";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Works");
});

app.use("/api/v1", routes);

app.use(errorNotFound);

const PORT = process.env.PORT || 5001;

const start = async () => {
  try {
    await connect(process.env.MONGO_DB_URI as string);
    connection.once("open", () => console.log("Connected to db"));

    app.listen(PORT, async () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
