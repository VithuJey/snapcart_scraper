const express = require("express");
const app = express();

app.use(express.json({ extended: false }));

app.use("/api", require("./Router/GroceryRouter"));

const Port = process.env.Port || 3000;

app.listen(Port, () => console.log("Server started"));
