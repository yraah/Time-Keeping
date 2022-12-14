import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import moment from 'moment'

export default class WeeklyController {
    /**
     * WeekList
     */
    public WeekList() {
        const startOfWeek = moment('1999-08-29').startOf('week')
        let lists:any = []

        let currentDate = moment(startOfWeek)
        let numberOfDaysInAWeek = 7
        for(let i = 0; i < numberOfDaysInAWeek; i++){
            lists.push({
                Date : moment(currentDate).format('YYYY-MM-DD'),
                Day: moment(currentDate).format('dddd')
            })
            currentDate.add(1, 'day')
        }
        return (lists)
    }

    /**
     * 
     */
    public () {
        
    }
   
}
