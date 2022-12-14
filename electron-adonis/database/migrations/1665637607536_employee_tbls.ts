import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employee_tbl'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('employee_id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('employee_first_name', 120)
      table.string('employee_last_name', 120)
      table.string('employee_username', 120)
      table.string('employee_password', 120)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
