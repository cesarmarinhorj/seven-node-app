'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmpresasSchema extends Schema {
  up () {
    this.create('empresas', (table) => {
      table.increments()
      table.integer('user_id'),
      table.string('cnpj', 18),
      table.string('razao_social'),
      table.string('inscricao_estadual'),
      table.string('estado'),
      table.timestamps()
    })
  }

  down () {
    this.drop('empresas')
  }
}

module.exports = EmpresasSchema
