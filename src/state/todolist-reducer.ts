import {TodolistsType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'All'}]

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