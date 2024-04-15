import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todolistsReducer } from './todolists-reducer';
import { tasksReducer } from './task-reducer';

// type AppRootState = {
//   todolists: Array<TodolistType>;
//   tasks: TasksStateType;
// };

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// @ts-ignore
window.store = store;
