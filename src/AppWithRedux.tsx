import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { TasksType, TodoList } from './components/TodoList';
import AddItemForm from './components/AddItemForm';
import { AppRootState } from './state/store';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from './state/todolists-reducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAc,
  removeTaskAC,
} from './state/task-reducer';
// import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [key: string]: Array<TasksType>;
};

function AppWithRedux() {
  const dispatch = useDispatch();
  // let todolistId1 = v1();
  // let todolistId2 = v1();
  const todolists = useSelector<AppRootState, Array<TodolistType>>((state) => state.todolists);
  const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks);

  // function removeTask(id: string, todolistId: string) {
  //   const action = removeTaskAC(id, todolistId);
  //   dispatch(action);
  // }

  // function addTask(title: string, todolistId: string) {
  //   const action = addTaskAC(title, todolistId);
  //   dispatch(action);
  // }

  // function changeStatus(id: string, isDone: boolean, todolistId: string) {
  //   const action = changeTaskStatusAC(id, isDone, todolistId);
  //   dispatch(action);
  // }

  // function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
  //   const action = changeTaskTitleAc(id, newTitle, todolistId);
  //   dispatch(action);
  // }

  // function changeFilter(value: FilterValuesType, todolistId: string) {
  //   const action = changeTodolistFilterAC(todolistId, value);
  //   dispatch(action);
  // }

  // function removeTodolist(id: string) {
  //   const action = removeTodolistAC(id);
  //   dispatch(action);
  // }

  // function changeTodolistTitle(id: string, title: string) {
  //   const action = changeTodolistTitleAC(id, title);
  //   dispatch(action);
  // }

  // const addTodolist = useCallback((title: string) => {
  //   const action = addTodolistAC(title);
  //   dispatch(action);
  // }, []);

  const removeTask = useCallback(
    (id: string, todolistId: string) => dispatch(removeTaskAC(id, todolistId)),
    [dispatch],
  );
  const addTask = useCallback(
    (title: string, todolistId: string) => dispatch(addTaskAC(title, todolistId)),
    [dispatch],
  );
  const changeStatus = useCallback(
    (id: string, isDone: boolean, todolistId: string) =>
      dispatch(changeTaskStatusAC(id, isDone, todolistId)),
    [dispatch],
  );
  const changeTaskTitle = useCallback(
    (id: string, newTitle: string, todolistId: string) =>
      dispatch(changeTaskTitleAc(id, newTitle, todolistId)),
    [dispatch],
  );
  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) =>
      dispatch(changeTodolistFilterAC(todolistId, value)),
    [dispatch],
  );
  const removeTodolist = useCallback((id: string) => dispatch(removeTodolistAC(id)), [dispatch]);
  const changeTodolistTitle = useCallback(
    (id: string, title: string) => dispatch(changeTodolistTitleAC(id, title)),
    [dispatch],
  );
  const addTodolist = useCallback((title: string) => dispatch(addTodolistAC(title)), [dispatch]);
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
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            return (
              <Grid item key={tl.id}>
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

export default AppWithRedux;
