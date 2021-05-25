"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProdutosSchema extends Schema {
  up() {
    this.create("produtos", (table) => {
      table.integer("id_nfe").notNullable();
      table.string("ncm").notNullable();
      table.string("nome").notNullable();
      table.float("pis").notNullable();
      table.float("cofins").notNullable();
      table.string("tributacao").notNullable();
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop("produtos");
  }
}

module.exports = ProdutosSchema;
