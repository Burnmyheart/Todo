import { useCallback } from 'react';
import { FilterValuesType } from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { Task } from './Task';

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  filter: FilterValuesType;
  id: string;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const TodoList = React.memo((props: PropsType) => {
  const addTaks = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id],
  );
  const removeTodolist = () => props.removeTodolist(props.id);
  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle);
    },
    [props.id, props.changeTodolistTitle],
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter('all', props.id),
    [props.changeFilter, props.id],
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter('active', props.id),
    [props.changeFilter, props.id],
  );
  const onComletedClickHandler = useCallback(
    () => props.changeFilter('completed', props.id),
    [props.changeFilter, props.id],
  );

  let tasksForTodolist = props.tasks;
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter((t) => t.isDone === true);
  }
  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter((t) => t.isDone === false);
  }
  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaks} />
      <div>
        {props.tasks.map((t) => (
          <Task
            task={t}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
            todolistId={props.id}
            key={t.id}
          />
        ))}
      </div>
      <div>
        <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>
          All
        </Button>
        <Button
          color={'primary'}
          variant={props.filter === 'active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}>
          Active
        </Button>
        <Button
          color={'secondary'}
          className={props.filter === 'completed' ? 'contained' : 'text'}
          onClick={onComletedClickHandler}>
          Completed
        </Button>
      </div>
    </div>
  );
});
