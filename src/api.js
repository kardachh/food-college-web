const express = require("express");
const {
  getUsers,
  getGroups,
  getStudents,
  addGroup,
  updateGroup,
  removeGroup,
  addStudent,
  getStudentMarks,
  getStudentInfo,
  getDisciplines,
  getTeacherAvailable,
  getGroupMarks,
  changeMark,
  addMark,
  getTeachers,
  addTeacherAvailable,
  removeTeacherAvailable,
  getStudyPlans,
  addStudyPlan,
  updateStudyPlan,
  removeStudyPlan
} = require("./database");
const apiRouter = express.Router();

apiRouter.use(require("express-status-monitor")());

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

apiRouter.get("/teachers", async (req, res) => {
  res.json(await getTeachers());
});

apiRouter.get("/teacherAvailable", async (req, res) => {
  const data = await getTeacherAvailable(req.session.user.role === "teacher" ? req.session.user.id : null);
  // req.session.authenticated ? res.json(data) : res.redirect("/authorization");
  res.json(data);
});

apiRouter.post("/teacherAvailable", async (req, res) => {
  console.log("add_body", req.body);
  const data = await addTeacherAvailable(req.body);
  // req.session.authenticated ? res.json(data) : res.redirect("/authorization");
  // res.json(data);
  res.json(321);
});

apiRouter.delete("/teacherAvailable", async (req, res) => {
  console.log("remove_body", req.body);
  const data = await removeTeacherAvailable(req.body);
  // req.session.authenticated ? res.json(data) : res.redirect("/authorization");
  // res.json(data);
  res.json(123);
});

apiRouter.get("/groups", async (req, res) => {
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
  } else res.json({ msg: "empty query", query: req.query, body: req.body });
  // req.session.authenticated ? res.json(data) : res.redirect("/authorization");
});

apiRouter.delete("/groups", async (req, res) => {
  console.log("query", req.query);
  console.log("body", req.body);
  if (req.body.id) {
    const data = await removeGroup(req.body);
    // req.session.authenticated ? res.json(data) : res.redirect("/authorization");
    res.json(data);
  } else res.json({ msg: "empty query", query: req.query, body: req.body });
});

apiRouter.get("/getStudentMarks", async (req, res) => {
  req.session.authenticated ? res.json(await getStudentMarks(req.query.id)) : res.redirect("/authorization");
});

apiRouter.get("/getGroupMarks", async (req, res) => {
  console.log("query", req.query);
  req.session.authenticated && req.session.user.role === "teacher" ? res.json(await getGroupMarks(req.query["group_id"], req.query["discipline_id"])) : res.redirect("/authorization");
});

apiRouter.get("/getStudentInfo", async (req, res) => {
  const studentId = req.query.id ? req.query.id : req.session.user.id;
  req.session.authenticated ? res.json(await getStudentInfo(req.session.user.id)) : res.redirect("/authorization");
});

apiRouter.get("/disciplines", async (req, res) => {
  req.session.authenticated ? res.json(await getDisciplines()) : res.redirect("/authorization");
});

apiRouter.get("/getUsers", async (req, res) => {
  req.session.authenticated ? res.json(await getUsers()) : res.redirect("/authorization");
});

apiRouter.get("/students", async (req, res) => {
  const data = await getStudents();
  req.session.authenticated ? res.json(data) : res.redirect("/authorization");
});

apiRouter.post("/students", async (req, res) => {
  console.log("query", req.query);
  console.log("body", req.body);
  const data = await addStudent(req.body);
  console.log(data);
  res.json(data);
  // req.session.authenticated ? res.json(data) : res.redirect("/authorization");
});

apiRouter.post("/addMark", async (req, res) => {
  console.log("body", req.body);
  res.json(await addMark(req.body["student_id"], req.body["disciplines_id"], req.body["value"], req.body["teacher_id"], req.body["hours"]));
});

apiRouter.put("/changeMark", async (req, res) => {
  console.log("query", req.query);
  res.json(await changeMark(req.query["value"], req.query["mark_id"]));
});

apiRouter.get("/study-plans", async (req, res) => {
  req.session.authenticated ? res.json(await getStudyPlans()) : res.redirect("/authorization");
});

apiRouter.post("/study-plans", async (req, res) => {
  console.log("body", req.body);
  res.session.authenticated && res.session.user.role === "admin" ? res.json(await addStudyPlan(req.body)) : res.sendStatus(404);
});

apiRouter.put("/study-plans", async (req, res) => {
  console.log("body", req.body);
  res.session.authenticated && res.session.user.role === "admin" ? res.json(await updateStudyPlan(req.body)) : res.sendStatus(404);
});

apiRouter.delete("/study-plans", async (req, res) => {
  console.log("body", req.body);
  res.session.authenticated && res.session.user.role === "admin" ? res.json(await removeStudyPlan(req.body)) : res.sendStatus(404);
});

module.exports = {
  apiRouter
};
