const { Client } = require("pg");
const connectionString = "postgresql://postgres:@localhost:1111/Students";

module.exports = {
  getUserData: async (login, password) => {
    try {
      const getUserData = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`SELECT u.*,rt.name as "role" from "users" u join role_type rt on u.role_type_id = rt.id where login='${login}' and password='${password}'`)
          .then((res) => {
            client.end();
            return res.rows;
          });
      };
      return await getUserData();
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  getGroups: async () => {
    try {
      const getGroups = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`SELECT * from "groups"`)
          .then((res) => {
            client.end();
            return res.rows;
          });
      };
      return await getGroups().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  getSpecialities: async () => {
    try {
      const getSpecialities = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`SELECT * FROM specialties;`)
          .then((res) => {
            client.end();
            return res.rows;
          });
      };
      return await getSpecialities().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  getTeacherAvailable: async (user_id) => {
    try {
      const getTeacherAvailable = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        const query = user_id ? `SELECT * from "available_disciplines" where user_id=${user_id}` : `SELECT * from "available_disciplines"`;
        return await client
          .query(query)
          .then((res) => {
            client.end();
            return res.rows;
          });
      };
      return await getTeacherAvailable().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  addTeacherAvailable: async (data) => {
    try {
      console.log("add", data);
      if (data) {
        const addTeacherAvailable = async () => {
          const client = new Client({
            connectionString
          });
          client.connect();
          const query = `INSERT INTO available_groups (teacher_id, group_id, disciplines_id) values (${data.teacher_id},${data.group_id},${data.discipline_id});`;
          console.log(query);
          return await client
            .query(query)
            .then(() => {
              client.end();
              return "OK";
            })
            .catch((e) => {
              console.error("Ошибка при доступе", e);
            });
        };
        return await addTeacherAvailable().then(res => res);
      } else {
        console.log(data);
        return { type: "error", msg: "Пустые поля" };
      }
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  removeTeacherAvailable: async (data) => {
    try {
      console.log("remove", data);
      if (data) {
        const removeTeacherAvailable = async () => {
          const client = new Client({
            connectionString
          });
          client.connect();
          return await client
            .query(`DELETE FROM available_groups WHERE id=${data.id};`)
            .then(() => {
              client.end();
              return "OK";
            });
        };
        return await removeTeacherAvailable().then(res => res);
      } else {
        console.log(data);
        return { type: "error", msg: "Пустые поля" };
      }
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  getGroupMarks: async (group_id, discipline_id) => {
    try {
      const getGroupMarks = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        const query = `SELECT * from "marks_v" where disciplines_id=${discipline_id} and group_id=${group_id}`
        console.log(query)
        return await client
          .query(query)
          .then((res) => {
            client.end();
            return res.rows;
          });
      };
      return await getGroupMarks().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  addGroup: async (data) => {
    try {
      if (data.name) {
        const addGroup = async () => {
          const client = new Client({
            connectionString
          });
          client.connect();
          return await client
            .query(`INSERT INTO "groups" ("name","speciality_id") VALUES('${data.name}',${data.speciality_id});`)
            .then(() => {
              client.end();
              return "OK";
            })
            .catch((e) => {
              console.error("Ошибка при добавлении группы", e);
            });
        };
        return await addGroup().then(res => res);
      } else {
        console.log(data);
        return { type: "error", msg: "Пустые поля" };
      }
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  updateGroup: async (data) => {
    try {
      const updateGroup = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`UPDATE "groups" SET "name"='${data.name}',speciality_id=${data.speciality_id} WHERE id=${data.id};`)
          .then(() => {
            client.end();
            return "OK";
          }).catch((e)=>console.log(e))
      };
      return await updateGroup().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  removeGroup: async (data) => {
    try {
      if (data) {
        const removeGroup = async () => {
          const client = new Client({
            connectionString
          });
          client.connect();
          return await client
            .query(`DELETE FROM "groups" WHERE id=${data.id};`)
            .then(() => {
              client.end();
              return "OK";
            });
        };
        return await removeGroup().then(res => res);
      } else {
        console.log(data);
        return { type: "error", msg: "Пустые поля" };
      }
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  getStudents: async () => {
    const getStudents = async () => {
      const client = new Client({
        connectionString
      });
      client.connect();
      return await client
        .query(`SELECT s.id,s.group_id,u.firstname,u.lastname,u.secondname from "students" s inner join users u on s.user_id = u.id`)
        .then((res) => {
          client.end();
          return res.rows;
        });
    };
    return await getStudents().then(res => res);
  },

  addStudent: async (data) => {
    try {
      if (data) {
        const client = new Client({
          connectionString
        });
        client.connect();

        const addUser = async () => {
          return await client
            .query(`INSERT INTO users (firstname, lastname, secondname, "role", login, "password") VALUES('${data.firstname}', '${data.lastname}', '${data.secondname}', 'student','${data.login}' , '${data.password}') RETURNING id`)
            .then((res) => res.rows[0].id).then((res) => res)
            .catch((e) => {
              console.error("Ошибка при добавлении студента", data, e);
            });
        };
        const addStudent = async (id) => {
          return await client.query(`INSERT INTO students (user_id, group_id) VALUES(${id}, ${data.group_id});`)
            .then(() => {
              client.end();
              return "OK";
            });
        };
        return await addUser().then(addStudent).then(res => res);
      } else {
        console.log(data);
        return { type: "error", msg: "Пустые поля" };
      }
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  // removeStudent: async (data) => {
  //   try {
  //     if (data) {
  //       const client = new Client({
  //         connectionString
  //       });
  //       client.connect();
  //
  //       const removeUser = async () => {
  //         return await client
  //           .query(`Delete from users where id=${user_id}`)
  //           .then((res) => res.rows[0].id).then((res) => res)
  //           .catch((e) => {
  //             console.error("Ошибка при добавлении студента", data, e);
  //           });
  //       };
  //       const removeStudent = async (id) => {
  //         return await client.query(`DELETE FROM students WHERE user_id=${id};`)
  //           .then(() => {
  //             client.end();
  //             return "OK";
  //           });
  //       };
  //       return await removeStudent().then(removeUser).then(res => res);
  //     } else {
  //       console.log(data);
  //       return { type: "error", msg: "Пустые поля" };
  //     }
  //   } catch (e) {
  //     return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
  //   }
  // },

  getStudentMarks: async (student_id) => {
    try {
      const getStudentMarks = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`SELECT * FROM student_marks where student_id=${student_id};`)
          .then((res) => {
            client.end();
            return res.rows;
          });
      };
      return await getStudentMarks().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  getStudentInfo: async (user_id) => {
    try {
      const getStudentInfo = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`SELECT user_id, student_id, firstname, lastname, secondname, group_id, group_name, code, speciality_name, short_name FROM student_info where user_id=${user_id};`)
          .then((res) => {
            client.end();
            return res.rows[0];
          });
      };
      return await getStudentInfo().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  getDisciplines: async () => {
    try {
      const getDisciplines = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`SELECT id, "name" FROM disciplines;`)
          .then((res) => {
            client.end();
            return res.rows;
          });
      };
      return await getDisciplines().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  getUsers: async () => {
    try {
      const getUsers = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`SELECT u.*,rt.name as "role" from "users" u join role_type rt on u.role_type_id = rt.id;`)
          .then((res) => {
            client.end();
            return res.rows;
          });
      };
      return await getUsers().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  addMark: async (student_id, disciplines_id, value, teacher_id, hours) => {
    try {
      const addMark = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        const query = `INSERT INTO marks (student_id, disciplines_id, mark_type_id, teacher_id, hours) VALUES(${student_id}, ${disciplines_id}, '${value}', ${teacher_id}, ${hours}) RETURNING *;`;
            console.log(query)
        return await client
          .query(query)
          .then((res) => {
            client.end();
            return res.rows;
          }).catch((e) => {
            console.error("Ошибка при добавлении оценки", data, e);
          });
      };
      return await addMark().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  changeMark: async (value, mark_id) => {
    try {
      const changeMark = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        const query = `UPDATE marks SET mark_type_id='${value}'  WHERE id=${mark_id};`;
        return await client
          .query(query)
          .then((res) => {
            client.end();
            return res.rows[0].message;
          }).catch((e) => {
            console.error("Ошибка при изменении оценки", data, e);
          });
      };
      return await changeMark().then(res => res);

    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  getTeachers: async () => {
    try {
      const getTeachers = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`select t.id as "teacher_id",t.user_id,u.firstname ,u.lastname ,u.secondname from teachers t join users u on t.user_id = u.id`)
          .then((res) => {
            client.end();
            return res.rows;
          });
      };
      return await getTeachers().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  getStudyPlans: async () => {
    try {
      const getStudyPlans = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`SELECT id, group_id, disciplines_id, semester, hours, "type" FROM study_plan;`)
          .then((res) => {
            client.end();
            return res.rows;
          });
      };
      return await getStudyPlans().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  /**
   * @param info : {id:number,group_id:number,disciplines_id:number,semester:number,hours:number,type:string}
   * @returns {Promise<{msg: string, type: string}|*>}
   */
  addStudyPlan: async (info) => {
    try {
      const addStudyPlan = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        const query = `INSERT INTO study_plan (group_id, disciplines_id, semester, hours, "type") VALUES(${info.group_id}, ${info.disciplines_id}, ${info.semester}, ${info.hours}, '${info.type}');`;
        return await client
          .query(query)
          .then((res) => {
            client.end();
            return res.rows;
          });
      };
      return await addStudyPlan().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  /**
   * @param info : {id:number,group_id:number,disciplines_id:number,semester:number,hours:number,type:string}
   * @returns {Promise<{msg: string, type: string}|*>}
   */
  updateStudyPlan: async (info) => {
    try {
      const updateStudyPlan = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`UPDATE study_plan SET group_id=${info.group_id}, disciplines_id=${info.disciplines_id}, semester=${info.semester}, hours=${info.hours}, "type"=${info.type} WHERE id=0;`)
          .then(() => {
            client.end();
            return "OK";
          });
      };
      return await updateStudyPlan().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  /**
   * @param id : id:number
   * @returns {Promise<{msg: string, type: string}|*>}
   */
  removeStudyPlan: async (id) => {
    try {
      if (data) {
        const removeStudyPlan = async () => {
          const client = new Client({
            connectionString
          });
          client.connect();
          return await client
            .query(`DELETE FROM study_plan WHERE id=${id};`)
            .then(() => {
              client.end();
              return "OK";
            });
        };
        return await removeStudyPlan().then(res => res);
      } else {
        console.log(data);
        return { type: "error", msg: "Пустые поля" };
      }
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  }
};
