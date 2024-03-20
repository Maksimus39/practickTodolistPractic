import {TasksStateType} from "../App";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistAC,
    RemoveTodolistActionType,
    todolistID1,
    todolistID2
} from "./todolist-reducer";

// create type ActionType
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
    todoID: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskID: string,
    taskStatus: boolean,
    todolistId: string
}
export type ChangeTaskTitleActionCreator = {
    type: 'CHANGE-TASK-TITLE',
    taskID: string,
    newTitle: string,
    todolistId: string
}

// create type ActionType
type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionCreator
    | AddTodolistActionType | RemoveTodolistActionType

// create function AC
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId, todoID: v1()}
}
export const changeTaskStatusAC = (taskID: string, taskStatus: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID: taskID, taskStatus: taskStatus, todolistId: todolistId}
}
export const changeTaskTitleAC = (taskID: string, newTitle: string, todolistId: string): ChangeTaskTitleActionCreator => {
    return {type: 'CHANGE-TASK-TITLE', taskID: taskID, newTitle: newTitle, todolistId: todolistId}
}


const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]
}


// create TasksReducer
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id != action.taskId)
            }
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.title, isDone: false};
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(ts => ts.id === action.taskID ? {
                    ...ts,
                    isDone: action.taskStatus
                } : ts)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(ts => ts.id === action.taskID ? {
                    ...ts,
                    title: action.newTitle
                } : ts)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoID]: []
            }
        case "REMOVE-TODOLIST": {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }


        default:
            return state
    }
}