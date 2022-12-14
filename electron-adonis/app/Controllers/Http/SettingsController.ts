import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Setting from 'App/Models/Setting'

export default class SettingsController {

    public async settingList ({}: HttpContextContract) {
        const tasks = await Setting
            .query()
        return (tasks)  
    }
}
