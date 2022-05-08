const path = require("path");
const express = require("express");
const { apiRouter } = require("./api");
const router = express.Router();

router.use((req, res, next) => {
  console.log(req.method,req.path);
  next();
});

router.get("/", (req, res) => {
  req.session.authenticated
    ? res.sendFile(path.join(path.resolve(), "/public/views/main/index.html"))
    : res.redirect("/authorization");
});

router.use("/api", apiRouter);

router.get("/groups", (req, res) => {
  req.session.authenticated
    ? res.sendFile(path.join(path.resolve(), "/public/views/groups/index.html"))
    : res.redirect("/authorization");
});

router.get("/record-book", (req, res) => {
  req.session.authenticated
    ? req.session.user.role==='student' ? res.sendFile(path.join(path.resolve(), "/public/views/record-book/student.html")): res.json(req.session.user)
    : res.redirect("/authorization");
});

router.get("/authorization", (req, res) => {
  req.session.authenticated
    ? res.redirect("/")
    : res.sendFile(
        path.join(path.resolve(), "/public/views/authorization/index.html")
      );
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  if (login && password) {
    if (req.session.authenticated) {
      res.json(req.session);
    } else {
      const { getUserData } = require("./database");
      const data = await getUserData(login, password);
      if (data.length !== 0) {
        req.session.authenticated = true;
        req.session.user = data[0];
        res.json({
          msg: {
            user: req.session.user,
            authorization: true,
          },
        });
      } else {
        res.status(403).json({ msg: "bad credentials" });
      }
    }
  } else {
    res.status(403).json({ msg: "empty fields" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/authorization");
});

module.exports = router;
