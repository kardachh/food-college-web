const express = require("express");
const { getGroups } = require("./database");
const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  req.session.authenticated ? next() : res.redirect("/authorization");
});

apiRouter.get("/", (req, res) => {
  req.session.authenticated
    ? res.sendStatus(200)
    : res.redirect("/authorization");
});

apiRouter.get("/getUserData", (req, res) => {
  const user = req.session.user;
  delete user.login;
  delete user.password;
  req.session.authenticated ? res.json(user) : res.redirect("/authorization");
});

apiRouter.get("/getGroups", async (req, res) => {
  const data = await getGroups()
  req.session.authenticated ? res.json(data) : res.redirect("/authorization");
});

module.exports = {
  apiRouter,
};
