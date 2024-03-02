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
    todolistID: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskID: string, taskStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist:(ID:string)=>void
}

export const Todolist = (props: PropsType) => {
    // controlled input
    const [taskTitle, setTaskTitle] = useState('')
    // state error
    const [error, setError] = useState<string | null>(null)
    // refactoring Button
    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            props.addTask(taskTitle.trim(), props.todolistID)
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
    const changeFilterTasksHandler = (value: FilterValuesType) => {
        props.changeFilter(value, props.todolistID)
    }
    const removeTodolistHandler = () => {
      props.removeTodolist(props.todolistID)
    }

    return (
        <div>
            <button onClick={removeTodolistHandler}>X</button>
            <h3>{props.title}</h3>
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
                {props.tasks.length === 0 ? (<p>Тасок нет</p>) : <ul>
                    {props.tasks.map(task => {
                        // removeTaskHandler
                        const removeTaskHandler = () => {
                            props.removeTask(task.id, props.todolistID)
                        }
                        // changeTaskStatusHandler
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            props.changeTaskStatus(task.id, newStatusValue, props.todolistID)
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
                <Button className={props.filter === 'All' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler("All")}/>
                <Button className={props.filter === 'Active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler("Active")}/>
                <Button className={props.filter === 'Completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler("Completed")}/>
            </div>
        </div>
    )
}