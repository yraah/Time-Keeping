import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'settings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('settings_id')
      table.string('settings_name',120)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
