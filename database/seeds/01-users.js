const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  return knex('users').del().then(function () {
    return knex('users').insert([
      { email: "seed@seed.com", password: bcrypt.hashSync("ilovelambda", 16) }
    ]);
  });
};
