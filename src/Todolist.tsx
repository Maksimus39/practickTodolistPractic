import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: PropsType) => {
    // controlled input
    const [taskTitle, setTaskTitle] = useState('')
    // refactoring Button
    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    // changeTaskTitleHandler
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    //addTaskOnKeyUpHandler
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    //changeFilterTasksHandler
    const changeFilterTasksHandler = (filter:FilterValuesType) => {
      changeFilter(filter)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button
                    title={'+'}
                    onClick={addTaskHandler}
                />
            </div>
            <div>
                {tasks.length === 0 ? (<p>Тасок нет</p>) : <ul>
                    {tasks.map(task => {
                        // removeTaskHandler
                        const removeTaskHandler = () => {
                            removeTask(task.id)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox"
                                       checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'X'} onClick={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>}
            </div>
            <div>
                <Button title={'All'} onClick={() => changeFilterTasksHandler('All')}/>
                <Button title={'Active'} onClick={() => changeFilterTasksHandler("Active")}/>
                <Button title={'Completed'} onClick={() => changeFilterTasksHandler("Completed")}/>
            </div>
        </div>
    )
}