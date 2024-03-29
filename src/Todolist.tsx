import React, {ChangeEvent} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    filter: string
    removeTodolist: (ID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = (props: PropsType) => {
    const addTask = (title: string) => {
        props.addTask(title, props.todolistID)
    }
    //changeFilterTasksHandler
    const changeFilterTasksHandler = (value: FilterValuesType) => {
        props.changeFilter(value, props.todolistID)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistID, newTitle)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                {/*<button onClick={removeTodolistHandler}>X</button>*/}

                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>

            </h3>
            <AddItemForm addItem={addTask}/>

            <div>
                {props.tasks.length === 0 ? (<p>Тасок нет</p>) : (
                    <ul>
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
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(task.id, newValue, props.todolistID)
                            }
                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>


                                    <Checkbox
                                        checked={task.isDone}
                                        color='primary'
                                        onChange={changeTaskStatusHandler}
                                    />
                                    {/*<input type="checkbox"*/}
                                    {/*       checked={task.isDone}*/}
                                    {/*       onChange={changeTaskStatusHandler}*/}
                                    {/*/>*/}


                                    {/*<span>{task.title}</span>*/}
                                    <EditableSpan
                                        title={task.title}
                                        onChange={onChangeTitleHandler}
                                    />


                                    {/*<Button title={'X'} onClick={removeTaskHandler}/>*/}
                                    <IconButton onClick={removeTaskHandler}>
                                        <Delete/>
                                    </IconButton>


                                </li>
                            )
                        })}
                    </ul>
                )}

                <div>
                    <Button
                        variant={props.filter === "All" ? 'outlined' : 'text'}
                        // className={props.filter === 'All' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterTasksHandler("All")}
                        color='inherit'
                    />
                    <Button
                        variant={props.filter === "Active" ? 'outlined' : 'text'}
                        // className={props.filter === 'Active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterTasksHandler("Active")}
                        color='primary'
                    />
                    <Button
                        variant={props.filter === "Completed" ? 'outlined' : 'text'}
                        // className={props.filter === 'Completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterTasksHandler("Completed")}
                        color='secondary'
                    />
                </div>
            </div>
        </div>
    )
}
