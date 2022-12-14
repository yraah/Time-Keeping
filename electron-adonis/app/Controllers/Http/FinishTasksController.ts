import finishTask from 'App/Models/FinishTask'
let moment = require('moment')

export default class FinishTasksController {
    public async getFinishTask () {
        const today = moment()
        const startOfWeek = today.startOf('week').format('YYYY-MM-DD')
        const endOfWeek = today.endOf('week').format('YYYY-MM-DD')

        const tasks= await finishTask
            .query()
            .preload('tasks_table')
            .whereBetween('date',[startOfWeek , endOfWeek])
        return tasks.map((user) => user.toJSON())
    }

    public async addFinishTask({ request } ) {
        const { task ,time } = request.all()
        const today = moment().format('YYYY-MM-DD')
        const employee_id = 1
        const checkDataIfExisting = await this.checkDataIfExisting(today, task)

        if(checkDataIfExisting === 0){
            await this.addTask(time, task, today, employee_id)
        }
        if(checkDataIfExisting){
            await this.updateTask(task, time, today, employee_id)
        }
    }

    public async checkDataIfExisting(today , task) {
        const allData = await this.getFinishTask()
        let valueId = 0

        allData.forEach((value)=>{
            if(moment(value.date).format('YYYY-MM-DD') === today && value.task_id === task){
                valueId = value.id
            }
        })

        return (valueId)
    }

    public WeekList() {
        const startOfWeek = moment().startOf('week')
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

    public async WeekListTask() {
        let taskIdObject = {}
        let taskArray:any = []  
        const data: any = await this.getFinishTask()    

        data.forEach(element => {
            let taskId = element.tasks_table.task_name   
            element.day = moment(element.date).format('dddd')
            element.date = moment(element.date).format('YYYY-DD-MM')

            if(taskId in taskIdObject) {
                element.list  = taskIdObject[taskId].push(element)
                return 
            }

            element.list = taskIdObject[taskId] = [element]
            return
        });
       
        for (const key in taskIdObject) {
            let totalTaskPerWeek = this.addTotalPerWeek(taskIdObject[key])
            taskArray.push({
                name: key,
                totalTime: totalTaskPerWeek,
                list: taskIdObject[key]
            })
        }

        return (taskArray)
    }   

    public addTotalPerWeek(obj) {
        return obj.map( el=> parseInt(el.time.replaceAll(':',''))).reduce( (a,b) => a+b);
    }   

    public async updateTask(task, time, today, employeeId){   
        await finishTask
        .query()
        .where('task_id', task)
        .where('date',today )
        .update({
            time: time,
            task_id:task,
            date: today,
            employee_id:employeeId
        })
    }  

    public async addTask(checkIn, task, today, employeeId) {
        await finishTask
        .create( {
            time: checkIn,
            task_id:task,
            date: today,
            employee_id:employeeId
        })
    }

    
    // public async queryGetTaskList(task) {
    //     let timeCheck:string = ''
    //     let dateCheck:Date = moment()

    //     const tasks= await finishTask
    //         .query()
    //         .where('task_id', task)

    //     tasks.forEach((user) => {
    //         timeCheck = user.toJSON().time
    //         dateCheck =  moment(user.toJSON().date).format('YYYY/MM/DD')
    //     })

    //     const momentTime =  moment(timeCheck , 'HH:mm:ss')
    //     const oldTimeFormat = momentTime.format('HH:mm:ss')

    //     return({oldTimeFormat,dateCheck})
    // }

    // /**
    //  * formatTime
    //  */
    // public formatTime(time) {
    //     const removeCharacter = time.replaceAll(':','');
    //     const mom = moment(removeCharacter, 'HHmmss');
    //     const checkIn: Date = mom.format('HH:mm:ss')

    //     return(checkIn)
    // }

    // /**
    //  * ComputeDuration
    //  */
    // public ComputeDuration(oldTimeFormat, checkIn) {
    //     const splitTime = oldTimeFormat.split(":")
    //     const splitCheck = checkIn.split(":")
    //     const checkHours = parseInt(splitCheck[0])
    //     const checkMinutes = parseInt(splitCheck[1])
    //     const checkSeconds = parseInt(splitCheck[2])
    //     const timeHours = parseInt(splitTime[0])
    //     const timeMinutes = parseInt(splitTime[1])
    //     const timeSeconds = parseInt(splitTime[2])

    //     return (`${checkHours + timeHours}:${checkMinutes+timeMinutes}:${checkSeconds+timeSeconds}`)
    // }  

    /**
     * addSameTaskToday
     */

    /**
     * addTask
     */

}
