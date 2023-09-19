const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(router);

app.use("/", express.static("./static"));

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(16888, () => {
  console.log("service start success, port is 16888");
});
