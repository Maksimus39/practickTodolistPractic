import * as React from 'react';
import {useState} from "react";

type EditableSpanPropsType = {
    title: string
};
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(true)

    return editMode
        ? <input value={props.title}/>
        : <span>{props.title}</span>
}