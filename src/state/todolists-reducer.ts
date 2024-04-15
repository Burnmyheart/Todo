import { FilterValuesType, TodolistType } from '../App';
import { v1 } from 'uuid';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
  todolistId: string;
};

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterValuesType;
};

export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

const inititalState: Array<TodolistType> = [];

export const todolistsReducer = (
  state: Array<TodolistType> = inititalState,
  action: ActionsType,
): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter((tl: { id: any }) => tl.id !== action.id);
    }
    case 'ADD-TODOLIST': {
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all',
        },
        ...state,
      ];
    }

    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }

    case 'CHANGE-TODOLIST-FILTER': {
      const { id } = action;
      const stateCopy = state.map((todolist) => {
        if (todolist.id === id) {
          return { ...todolist, filter: action.filter }; // Создаем новый объект тудулиста с обновленным свойством filter
        }
        return todolist; // Возвращаем неизмененный тудулист, если id не совпадает
      });
      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title, todolistId: v1() };
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title };
};

export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType,
): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter };
};
