// @flow
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
};
export const AddItemForm = (props: AddItemFormPropsType) => {
    // controlled input
    const [taskTitle, setTaskTitle] = useState('')
    // state error
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (taskTitle.trim() !== '') {
            props.addItem(taskTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    // changeTaskTitleHandler
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItem()
        }
    }


    return (
        <div>
            <TextField variant='outlined'
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyPress={addTaskOnKeyUpHandler}
                // className={error ? "error" : ''}
                       error={!!error}
                       label='Title'
                       helperText={error}
            />


            {/*<input value={taskTitle}*/}
            {/*       onChange={changeTaskTitleHandler}*/}
            {/*       onKeyPress={addTaskOnKeyUpHandler}*/}
            {/*       className={error ? 'error' : ''}*/}
            {/*/>*/}


            {/*<Button*/}
            {/*    onClick={addItem}*/}
            {/*    variant='contained'*/}
            {/*    color='primary'*/}
            {/*        style={{maxWidth: '53px', maxHeight: '53px', minWidth: '53px', minHeight: '53px'}}>+</Button>*/}
            <IconButton
                color='primary'
                onClick={addItem}>
                <AddBox style={{maxWidth: '53px', maxHeight: '53px', minWidth: '53px', minHeight: '53px'}}
                />
            </IconButton>


            {/*{error && <div className='error-message'>{error}</div>}*/}
        </div>
    );
};