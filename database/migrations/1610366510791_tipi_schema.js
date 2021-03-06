'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipiSchema extends Schema {
  up() {
    this.create('tipis', (table) => {
      table.increments(),
        table.integer("ncm"),
        table.string("descricao"),
        table.string("aliquota"),
        table.timestamps()
    })
  }

  down() {
    this.drop('tipis')
  }
}

module.exports = TipiSchema
