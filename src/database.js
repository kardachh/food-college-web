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
          .query(`SELECT * from "users" where login='${login}' and password='${password}'`)
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

  getTeacherAvailable: async (user_id) => {
    try {
      const getTeacherAvailable = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`SELECT * from "available_disciplines" where user_id=${user_id}`)
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

  getGroupMarks: async (group_id, discipline_id) => {
    try {
      const getGroupMarks = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        return await client
          .query(`SELECT * from "marks_v" where disciplines_id=${discipline_id} and group_id=${group_id}`)
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
            .query(`INSERT INTO public."groups" ("name","speciality_id") VALUES('${data.name}',${data.speciality_id});`)
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
          .query(`UPDATE public."groups" SET "name"='${data.name}' WHERE id=${data.id};`)
          .then(() => {
            client.end();
            return "OK";
          });
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
            .query(`DELETE FROM public."groups" WHERE id=${data.id};`)
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
            .query(`INSERT INTO public.users (firstname, lastname, secondname, "role", login, "password") VALUES('${data.firstname}', '${data.lastname}', '${data.secondname}', 'student','${data.login}' , '${data.password}') RETURNING id`)
            .then((res) => res.rows[0].id).then((res) => res)
            .catch((e) => {
              console.error("Ошибка при добавлении студента", data, e);
            });
        };
        const addStudent = async (id) => {
          return await client.query(`INSERT INTO public.students (user_id, group_id) VALUES(${id}, ${data.group_id});`)
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
  //           .query(`Delete from public.users where id=${user_id}`)
  //           .then((res) => res.rows[0].id).then((res) => res)
  //           .catch((e) => {
  //             console.error("Ошибка при добавлении студента", data, e);
  //           });
  //       };
  //       const removeStudent = async (id) => {
  //         return await client.query(`DELETE FROM public.students WHERE user_id=${id};`)
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
          .query(`SELECT id, semester, group_id, group_name, student_id, disciplines_id, "name", "hours passed" as "hours_passed", "hours all" as "hours_all", "type", value FROM public.student_marks where student_id=${student_id};`)
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
          .query(`SELECT user_id, student_id, firstname, lastname, secondname, group_id, group_name, code, speciality_name, short_name FROM public.student_info where user_id=${user_id};`)
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
          .query(`SELECT id, "name", hours, "type" FROM public.disciplines;`)
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
          .query(`SELECT id, firstname, lastname, secondname, "role" FROM public.users;`)
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
        const query = `INSERT INTO public.marks (student_id, disciplines_id, value, teacher_id, hours) VALUES(${student_id}, ${disciplines_id}, '${value}', ${teacher_id}, ${hours}) RETURNING *;`
        return await client
          .query(query)
          .then((res) => {
            client.end();
            return res.rows;
          });
      };
      return await addMark().then(res => res);
    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  changeMark: async (value,mark_id) => {
    try {
      const changeMark = async () => {
        const client = new Client({
          connectionString
        });
        client.connect();
        const query = `UPDATE public.marks SET value='${value}'  WHERE id=${mark_id};`
        return await client
          .query(query)
          .then((res) => {
            client.end();
            return res.rows[0].message;
          });
      };
      return await changeMark().then(res => res);

    } catch (e) {
      return { type: "error", msg: "Ошибка при вылонении запроса: " + e };
    }
  }
};
