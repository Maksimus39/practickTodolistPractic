import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodolistsType = {
    id: string
    title: string
    filter: string
}
export type TasksStateType = {
    [key: string]: TaskType[]
}


function AppWithRedux() {


    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    const dispatch = useDispatch()

    // function remove task
    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
        //   setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }
    // function changeFilter
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = ChangeTodolistFilterAC(value, todolistId)
        dispatch(action)
        //   setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }
    // function addTask
    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatch(action)

    };

    // function changeTaskStatusHandler
    const changeTaskStatus = (taskID: string, taskStatus: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskID, taskStatus, todolistId)
        dispatch(action)

    }

    // function removeTodolist
    function removeTodolist(ID: string) {
        const action = RemoveTodolistAC(ID)
        dispatch(action)
    }

    // добавляем новый тудулист
    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatch(action)
    }

    function changeTaskTitle(taskID: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(taskID, newTitle, todolistId)
        dispatch(action)
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const action = ChangeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
    }

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography>
                        Todolist
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(todolists => {
                        // filter box task
                        let tasksForTodolist = tasks[todolists.id]
                        if (todolists.filter === 'Active') {
                            tasksForTodolist = tasks[todolists.id].filter(ts => ts.isDone === false)
                        }
                        if (todolists.filter === 'Completed') {
                            tasksForTodolist = tasks[todolists.id].filter(ts => ts.isDone === true)
                        }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    changeTodolistTitle={changeTodolistTitle}
                                    changeTaskTitle={changeTaskTitle}
                                    key={todolists.id}
                                    todolistID={todolists.id}
                                    title={todolists.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={todolists.filter}
                                    removeTodolist={removeTodolist}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>

            </Container>

        </div>
    );
}

export default AppWithRedux;
