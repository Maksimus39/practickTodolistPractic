import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

// type ActionType = {
//     type: string
//     [key: string]: any
// }

// create type ActionType
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todoID:string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

// create ActionType
type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

// create function AC
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: newTodolistTitle, todoID:v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: newTodolistTitle}
}
export const ChangeTodolistFilterAC = (todolistId: string,newFilter:FilterValuesType):ChangeTodolistFilterActionType => {
  return {type:'CHANGE-TODOLIST-FILTER',id:todolistId,filter:newFilter}
}


export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todoID, title: action.title, filter: 'All'}]

        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(td => td.id === action.id ? {...td, title: action.title} : td)]
        case 'CHANGE-TODOLIST-FILTER':
            return {
                ...state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
            }

        default:
            throw new Error('I don\'t understand this type')
    }
}