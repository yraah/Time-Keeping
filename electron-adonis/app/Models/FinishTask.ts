import { BaseModel, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import tasks_table from './Task'

export default class FinishTask extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public task_id: number

  @column()
  public time: Date

  @column()
  public date: Date

  @column()
  public employee_id: number

  @hasOne(() => tasks_table, { localKey: 'task_id', foreignKey: 'task_id' })
  public tasks_table: HasOne<typeof tasks_table>
}
