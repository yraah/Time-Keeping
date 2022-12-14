import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class tasks_table extends BaseModel {
  @column({ isPrimary: true })
  public task_id: number

  @column()
  public task_name: string
}
