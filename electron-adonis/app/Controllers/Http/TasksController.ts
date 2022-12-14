import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {

    public async taskList ({}: HttpContextContract) {
        const tasks = await Task
            .query()
        return (tasks)  
    }
}
