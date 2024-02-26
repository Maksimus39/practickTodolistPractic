import React from "react";
import {Button} from "./Button";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist = ({title, tasks}: PropsType) => {
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
                            </li>
                        )
                    })}
                    {/*<li><input type="checkbox" checked={tasks[0].isDone}/> <span>{tasks[0].title}</span></li>*/}
                    {/*<li><input type="checkbox" checked={tasks[1].isDone}/> <span>{tasks[1].title}</span></li>*/}
                    {/*<li><input type="checkbox" checked={tasks[2].isDone}/> <span>{tasks[2].title}</span></li>*/}
                </ul>}
            </div>

            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
                {/*<button>All</button>*/}
                {/*<button>Active</button>*/}
                {/*<button>Completed</button>*/}
            </div>
        </div>
    )
}