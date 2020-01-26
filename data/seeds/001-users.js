const bcrypt = require("bcryptjs");
exports.seed = function(knex, Promise) {
  const users = [
    {
      username: "thisispatrick",
      password: bcrypt.hashSync('test', 10)
    },
    {
      username: "patrick",
      password: bcrypt.hashSync('test', 10)
    },
    {
      username: "mitsy",
      password: bcrypt.hashSync('test', 10)
    }
  ];

  return (
    knex
      // Deletes ALL existing entries for users table
      .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
      .then(function() {
        return knex("users").insert(users);
      })
  );
};
