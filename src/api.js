const express = require("express");
const { getGroups, getStudents, addGroup, updateGroup, removeGroup, addStudent, getStudentMarks, getStudentInfo } = require("./database");
const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  // req.session.authenticated ? next() : res.redirect("/authorization");
  next();
});

apiRouter.get("/", (req, res) => {
  req.session.authenticated ? res.sendStatus(200) : res.redirect("/authorization");
});

apiRouter.get("/getUserData", (req, res) => {
  const user = req.session.user;
  delete user.login;
  delete user.password;
  req.session.authenticated ? res.json(user) : res.redirect("/authorization");
});

apiRouter.get("/groups", async (req, res) => {
  console.log("query", req.query);
  console.log("body", req.body);
  const data = await getGroups();
  // req.session.authenticated ? res.json(data) : res.redirect("/authorization");
  res.json(data);
});

apiRouter.post("/groups", async (req, res) => {
  console.log("query", req.query);
  console.log("body", req.body);
  const data = await addGroup(req.body);
  // req.session.authenticated ? res.json(data) : res.redirect("/authorization");
  res.json(data);
});

apiRouter.put("/groups", async (req, res) => {
  console.log("query", req.query);
  console.log("body", req.body);
  if (req.body) {
    const data = await updateGroup(req.body);
    res.json(data);
  }
  else res.json({msg:'empty query',query:req.query,body:req.body})
  // req.session.authenticated ? res.json(data) : res.redirect("/authorization");
});

apiRouter.delete("/groups", async (req, res) => {
  console.log("query", req.query);
  console.log("body", req.body);
  if (req.body.id){
    const data = await removeGroup(req.body);
    // req.session.authenticated ? res.json(data) : res.redirect("/authorization");
    res.json(data);
  }
  else res.json({msg:'empty query',query:req.query,body:req.body})
});

apiRouter.get("/getStudentMarks", async (req, res) => {
  req.session.authenticated ? res.json(await getStudentMarks(req.query.id)) : res.redirect("/authorization");
});

  apiRouter.get("/getStudentInfo", async (req, res) => {
  req.session.authenticated ? res.json(await getStudentInfo(req.session.user.id)) : res.redirect("/authorization");
});

apiRouter.get("/students", async (req, res) => {
  const data = await getStudents();
  req.session.authenticated ? res.json(data) : res.redirect("/authorization");
});

apiRouter.post("/students", async (req, res) => {
  console.log("query", req.query);
  console.log("body", req.body);
  const data = await addStudent(req.body);
  console.log(data)
  res.json(data);
  // req.session.authenticated ? res.json(data) : res.redirect("/authorization");
});


module.exports = {
  apiRouter
};
