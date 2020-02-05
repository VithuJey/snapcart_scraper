const express = require("express");
const connectDB = require("./db/connect");
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api', require('./router/GroceryRouter'));

const Port = process.env.Port || 3000;

app.listen(Port, () => console.log("Server started"));
