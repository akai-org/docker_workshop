const express = require("express");

const app = express();
const port = 8080;

app.set("view engine", "ejs");

const handler = (req, res) => {
  const name = req.params.name || process.env.NAME || "World";

  res.render("index", { name: name });
};

app.get("/", handler);
app.get("/:name", handler);

app.listen(port, () => {
  console.log(`Starting server on port ${port}...`);
});
