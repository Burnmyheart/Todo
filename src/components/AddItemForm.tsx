import { useState, ChangeEvent } from 'react';
import { Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import React from 'react';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>('');
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const addTask = () => {
    if (title.trim() !== '') {
      props.addItem(title.trim());
      setTitle('');
    } else {
      setError('Title is required');
    }
  };
  const onKeyPressHandler = (e: any) => {
    if (error !== null) {
      setError(null);
    }

    if (e.keyCode === 13) {
      addTask();
    }
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Type value"
        variant="outlined"
        value={title}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />

      <Button
        onClick={addTask}
        variant={'contained'}
        color={'primary'}
        style={{ marginLeft: '10px' }}>
        <Add />
      </Button>
    </div>
  );
});
export default AddItemForm;
