import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";


export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
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
    const removeTask = (taskId: number) => {
        const filteredTasks = tasks.filter(ts => ts.id !== taskId)
        setTasks(filteredTasks)
        console.log(filteredTasks)
    }
    // function changeFilter
    const changeFilter = (filter:FilterValuesType) => {
      setFilter(filter)
    }


    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}


            />
        </div>
    );
}

export default App;
