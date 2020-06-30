const express = require("express");
const mongodb = require("mongodb");



const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server start on ${PORT}`));

app.post("hello world");



app.get('/', function (req, res) {
  res.send('hello world')
});
