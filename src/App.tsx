import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('All')

    // filter box task
    let tasksForTodolist = tasks
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(ts => ts.isDone === false)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(ts => ts.isDone === true)
    }


    // function remove task
    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(ts => ts.id !== taskId)
        setTasks(filteredTasks)
        console.log(filteredTasks)
    }
    // function changeFilter
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    // function addTask
    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    // function changeTaskStatusHandler
    const changeTaskStatus = (taskID: string, taskStatus: boolean) => {
        // const task = tasks.find(ts => ts.id === taskID)
        // if (task) {
        //     task.isDone = taskStatus
        //     setTasks([...tasks])
        // }
        const newState = tasks.map(ts => (ts.id === taskID ? {...ts, isDone: taskStatus} : ts))
        setTasks(newState)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
