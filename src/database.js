const { Client } = require("pg");
const _ = require('lodash');

const connectionString = "postgresql://postgres:@localhost:1111/Students";

module.exports = {
  getUserData: async (login, password) => {
    const getUserData = async () => {
      const client = new Client({
        connectionString,
      });
      client.connect();
      return await client
        .query(
          `SELECT * from "users" where login='${login}' and password='${password}'`
        )
        .then((res) => {
          client.end();
          return res.rows;
        });
    };

    return await getUserData();
  },

  getGroups: async () => {
    const getGroups = async () => {
      const client = new Client({
        connectionString,
      });
      client.connect();
      return await client
        .query(
          `SELECT * from "group_with_students"`
        )
        .then((res) => {
          client.end();
          return res.rows;
        });
    };
    return await getGroups().then(res => _.groupBy(res, group => group.name))
  }
};
