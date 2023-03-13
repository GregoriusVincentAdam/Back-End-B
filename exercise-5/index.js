const express = require("express");
const dataUser = require("./users.js");
const morgan = require("morgan");

const app = express();

// Middleware 404
const notFound = (req, res, next) => {
  res.json({
    status: "error",
    message: "resource tidak ditemukan",
  });
};

// error
app.use((err, req, res, next) => {
  res.json({
    status: "error",
    message: `Terjadi Kesalahan Pada Server: ${err}`,
  });
});

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send("Hello, This is the homepage (Adam, Gregorius Vincent)");
});

app.get("/users", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.json(dataUser);
});

app.get("/users/:name", (req, res) => {
  let name = req.params.name.toLowerCase();
  const user = dataUser.find((user) => user.name.toLowerCase() === name);
  if (user) {
    res.json({
      user,
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Data tidak ditemukan",
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
