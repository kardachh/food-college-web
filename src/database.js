const { Pool } = require("pg");
const connectionString = "postgresql://postgres:@localhost:1111/Students";

module.exports = {
  getUserData: async (login, password) => {
    try {
      const getUserData = async () => {
        const client = new Pool({
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
      return { msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  getGroups: async () => {
    try {
      const getGroups = async () => {
        const client = new Pool({
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
      return { msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  addGroup: async (data) => {
    try {
      if (data.name) {
        const addGroup = async () => {
          const client = new Pool({
            connectionString
          });
          client.connect();
          return await client
            .query(`INSERT INTO public."groups" ("name") VALUES('${data.name}');`)
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
        return { msg: "Пустые поля" };
      }
    } catch (e) {
      return { msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  updateGroup: async (data) => {
    try {
      const updateGroup = async () => {
        const client = new Pool({
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
      return { msg: "Ошибка при вылонении запроса: " + e };
    }

  },

  removeGroup: async (data) => {
    try {
      if (data) {
        const removeGroup = async () => {
          const client = new Pool({
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
        return { msg: "Пустые поля" };
      }
    } catch (e) {
      return { msg: "Ошибка при вылонении запроса: " + e };
    }
  },

  getStudents: async () => {
    const getStudents = async () => {
      const client = new Pool({
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
        const client = new Pool({
          connectionString
        });
        client.connect();

        const addUser = async () => {
          return await client
            .query(`INSERT INTO public.users (firstname, lastname, secondname, "role", login, "password") VALUES('${data.firstname}', '${data.lastname}', '${data.secondname}', 'student','${data.login}' , '${data.password}') RETURNING id`)
            .then((res) => res.rows[0].id).then((res)=>res)
            .catch((e) => {
              console.error("Ошибка при добавлении студента", data, e);
            });
        };
        const addStudent = async(id) => {
          return await client.query(`INSERT INTO public.students (user_id, group_id) VALUES(${id}, ${data.group_id});`)
            .then(() => {
              client.end();
              return "OK";
            });
        }
        return await addUser().then(addStudent).then(res=>res);
      } else {
        console.log(data);
        return { msg: "Пустые поля" };
      }
    } catch (e) {
      return { msg: "Ошибка при вылонении запроса: " + e };
    }
  }
};
