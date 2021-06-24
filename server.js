const express = require("express");

const app = express();

app.use(express.static("./dist/front-ebanking"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/front-ebanking/" })
);

app.listen(process.env.PORT || 8080);
