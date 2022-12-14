import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks_tables'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('task_id')
      table.string('task_name',120)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
