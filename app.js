const path = require("path");
const express = require("express");
const controller = require("./src/controller");
const session = require("express-session");
const { urlencoded } = require("express");

const app = express();
const port = 3000;
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/static", express.static("public"));

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/images/favicon.ico"));
});

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "some secret",
    cookie: { maxAge: oneDay },
    resave: false,
    saveUninitialized: true,
  })
);

app.use(controller);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
