'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipiFilhosSchema extends Schema {
  up() {
    this.create('tipi_filhos', (table) => {
      table.increments(),
        table.integer("ncm"),
        table.integer("ncm_pai"),
        table.string("descricao"),
        table.string("aliquota"),
        table.timestamps()
    })
  }

  down() {
    this.drop('tipi_filhos')
  }
}

module.exports = TipiFilhosSchema
