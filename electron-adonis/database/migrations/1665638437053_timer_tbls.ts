import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'timer_tbl'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('employee_id',120)
      table.string('task_id',120)
      table.string('time',120)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
