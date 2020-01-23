const { onUpdateTrigger } = require("../../knexfile");

exports.up = knex =>
  knex.schema
    .createTable("nps", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);

      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .string("name", 128)
        .notNullable()
        .unique();
      tbl.text("description").notNullable();
      tbl.integer("total_promoters", 100).notNullable();
      tbl.integer("total_passives", 100).notNullable();
      tbl.integer("total_detractors", 100).notNullable();
      tbl.integer("nps_score", 100).notNullable();
    })
    .then(() => knex.raw(onUpdateTrigger("nps")));

exports.down = knex => knex.schema.dropTable("nps");
