import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()
    // массив тудулистов
    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])
    // массив тасок
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    // function remove task
    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }
    // function changeFilter
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }
    // function addTask
    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    };

    // function changeTaskStatusHandler
    const changeTaskStatus = (taskID: string, taskStatus: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskID ? {...task, isDone: taskStatus} : task)
        })
    }

    // function removeTodolist
    function removeTodolist(ID: string) {
        setTodolists(todolists.filter(todos => todos.id !== ID))
        delete tasks[ID]
        setTasks({...tasks})
    }

    // добавляем новый тудулист
    function addTodolist(title: string) {
        console.log(title)
        let newTodolistId = v1()
        let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: "All"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    function changeTaskTitle(taskID: string, newTitle: string, todolistId: string) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskID ? {...task, title: newTitle} : task)
        })
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        setTodolists(todolists.map(todos => todos.id === todolistId ? {...todos, title: newTitle} : todos))
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
                <Grid container style={{padding:'20px'}}>
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

export default App;
