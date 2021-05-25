"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class NotasFiscaisSchema extends Schema {
  up() {
    this.create("notas_fiscais", (table) => {
      table.string("chave").notNullable();
      table.string("numero").notNullable();
      table.integer("id_auditoria").notNullable();
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop("notas_fiscais");
  }
}

module.exports = NotasFiscaisSchema;
