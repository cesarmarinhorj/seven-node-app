'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PisCofinsSchema extends Schema {
  up () {
    this.create('pis_cofins', (table) => {
      table.increments()
      table.integer('ncm')
      table.float('pis')
      table.float('cofins')
      table.timestamps()
    })
  }

  down () {
    this.drop('pis_cofins')
  }
}

module.exports = PisCofinsSchema