import React from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter}: PropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            <div>
                {tasks.length === 0 ? (<p>Тасок нет</p>) : <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox"
                                       checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'X'} onClick={() => removeTask(task.id)}/>
                            </li>
                        )
                    })}
                </ul>}
            </div>
            <div>
                <Button title={'All'} onClick={() => changeFilter('All')}/>
                <Button title={'Active'} onClick={() => changeFilter("Active")}/>
                <Button title={'Completed'} onClick={() => changeFilter("Completed")}/>
            </div>
        </div>
    )
}