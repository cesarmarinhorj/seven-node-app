"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AuditoriaSchema extends Schema {
  up() {
    this.create("auditorias", (table) => {
      table.integer("id_empresa").notNullable();
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop("auditorias");
  }
}

module.exports = AuditoriaSchema;
