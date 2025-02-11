import { useReducer, useState } from 'react';
import './App.css';
import { TasksType, TodoList } from './components/TodoList';
import { v1 } from 'uuid';
import AddItemForm from './components/AddItemForm';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from './state/todolists-reducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAc,
  removeTaskAC,
  tasksReducer,
} from './state/task-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TasksType>;
};

function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: true },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'RestAPI', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Book', isDone: false },
      { id: v1(), title: 'Milk', isDone: true },
    ],
  });

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatchToTasksReducer(action);

    // //достанем нужный массив по todolistId:
    // let todolistTasks = tasks[todolistId];
    // // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
    // tasks[todolistId] = todolistTasks.filter((t) => t.id !== id);
    // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    // setTasks({ ...tasks });
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId);
    dispatchToTasksReducer(action);

    // let task = { id: v1(), title: title, isDone: false };
    // //достанем нужный массив по todolistId:
    // let todolistTasks = tasks[todolistId];
    // // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
    // tasks[todolistId] = [task, ...todolistTasks];
    // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    // setTasks({ ...tasks });
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(id, isDone, todolistId);
    dispatchToTasksReducer(action);
    // //достанем нужный массив по todolistId:
    // let todolistTasks = tasks[todolistId];
    // // найдём нужную таску:
    // let task = todolistTasks.find((t) => t.id === id);
    // //изменим таску, если она нашлась
    // if (task) {
    //   task.isDone = isDone;
    //   // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    //   setTasks({ ...tasks });
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    const action = changeTaskTitleAc(id, newTitle, todolistId);
    dispatchToTasksReducer(action);

    // //достанем нужный массив по todolistId:
    // let todolistTasks = tasks[todolistId];
    // // найдём нужную таску:
    // let task = todolistTasks.find((t) => t.id === id);
    // //изменим таску, если она нашлась
    // if (task) {
    //   task.title = newTitle;
    //   // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    //   setTasks({ ...tasks });
    // }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatchToTodolistsReducer(action);

    // let todolist = todolists.find((tl) => tl.id === todolistId);
    // if (todolist) {
    //   todolist.filter = value;
    //   setTodolists([...todolists]);
    // }
  }

  function removeTodolist(id: string) {
    const action = removeTodolistAC(id);
    dispatchToTasksReducer(action);
    dispatchToTodolistsReducer(action);

    // // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
    // setTodolists(todolists.filter((tl) => tl.id !== id));
    // // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
    // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
    // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    // setTasks({ ...tasks });
  }

  function changeTodolistTitle(id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatchToTodolistsReducer(action);
    // // найдём нужный todolist
    // const todolist = todolists.find((tl) => tl.id === id);
    // if (todolist) {
    //   // если нашёлся - изменим ему заголовок
    //   todolist.title = title;
    //   setTodolists([...todolists]);
    // }
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatchToTasksReducer(action);
    dispatchToTodolistsReducer(action);
    // let newTodolistId = v1();
    // let newTodolist: TodolistType = { id: newTodolistId, title: title, filter: 'all' };
    // setTodolists([newTodolist, ...todolists]);
    // setTasks({
    //   ...tasks,
    //   [newTodolistId]: [],
    // });
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Todolist</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={5}>
          {todolists.map((tl) => {
            let tasksForTodolist = tasks[tl.id];
            if (tl.filter === 'completed') {
              tasksForTodolist = tasks[tl.id].filter((t) => t.isDone === true);
            }
            if (tl.filter === 'active') {
              tasksForTodolist = tasks[tl.id].filter((t) => t.isDone === false);
            }
            return (
              <Grid item>
                <Paper style={{ padding: '50px' }}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
