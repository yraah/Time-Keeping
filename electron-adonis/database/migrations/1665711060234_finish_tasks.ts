import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'finish_tasks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('task_id')
      table.string('time')
      table.date('date')
      table.integer('employee_id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
