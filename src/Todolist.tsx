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
    changeTaskStatus: (taskID: string, taskStatus: boolean) => void
    filter: FilterValuesType
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter}: PropsType) => {
    // controlled input
    const [taskTitle, setTaskTitle] = useState('')
    // state error
    const [error, setError] = useState<string | null>(null)
    // refactoring Button
    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    // changeTaskTitleHandler
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    //addTaskOnKeyUpHandler
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    //changeFilterTasksHandler
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}
                       className={error ? 'error' : ''}
                />
                <Button
                    title={'+'}
                    onClick={addTaskHandler}
                />
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <div>
                {tasks.length === 0 ? (<p>Тасок нет</p>) : <ul>
                    {tasks.map(task => {
                        // removeTaskHandler
                        const removeTaskHandler = () => {
                            removeTask(task.id)
                        }
                        // changeTaskStatusHandler
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeTaskStatusHandler}
                                />
                                <span>{task.title}</span>
                                <Button title={'X'} onClick={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>}
            </div>
            <div>
                <Button className={filter === 'All' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('All')}/>
                <Button className={filter === 'Active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler("Active")}/>
                <Button className={filter === 'Completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler("Completed")}/>
            </div>
        </div>
    )
}