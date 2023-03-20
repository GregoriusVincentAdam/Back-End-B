const express = require("express");
//const bodyParser = require("body-parser");

const app = express();
const users = require("./users");

// Gunakan body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoint untuk mendapatkan semua data user
app.get("/users", (req, res) => {
  res.json(users);
});

// Endpoint untuk mendapatkan data user berdasarkan id
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

app.get("/users/search/:name", (req, res) => {
  let name = req.params.name.toLowerCase();
  const user = users.find((user) => user.name.toLowerCase() === name);
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

// Endpoint untuk menambahkan data user
app.post("/users", (req, res) => {
  const { id, name } = req.body;
  const newUser = { id, name };
  users.push(newUser);
  res.json(`Berhasil menambahkan username: ${name}, dan id: ${id}`);
});

// Endpoint untuk mengupdate data user berdasarkan id
// app.put("/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name } = req.body;

//   const userIndex = users.findIndex((user) => user.id === id);

//   if (userIndex !== -1) {
//     users[userIndex].name = name;
//     res.sendStatus(204);
//   } else {
//     res.sendStatus(404);
//   }
// });

// Endpoint untuk menghapus data user berdasarkan id
// app.delete("/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);

//   const userIndex = users.findIndex((user) => user.id === id);

//   if (userIndex !== -1) {
//     users.splice(userIndex, 1);
//     res.sendStatus(204);
//   } else {
//     res.sendStatus(404);
//   }
// });

// Jalankan server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
