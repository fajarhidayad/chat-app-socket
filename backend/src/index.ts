import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Works");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
