// @flow
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@mui/material";

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
            <input value={taskTitle}
                   onChange={changeTaskTitleHandler}
                   onKeyPress={addTaskOnKeyUpHandler}
                   className={error ? 'error' : ''}
            />
            <Button onClick={addItem} variant='contained' color='success' style={{maxWidth:'20px',maxHeight:'20px',minWidth:'20px',minHeight:'20px'}}>+</Button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};