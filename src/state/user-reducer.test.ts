import { userReducer } from './user-reducer';

test('user reducer should increment only age', () => {
  const startState = { age: 20, childrenCount: 2, name: 'Daniil' };

  const endState = userReducer(startState, { type: 'INCREMENT-AGE' });

  expect(endState.childrenCount).toBe(2);
  expect(endState.age).toBe(21);
});

test('user reducer should change name of user', () => {
  const startState = { name: 'Daniil', age: 20, childrenCount: 2 };
  const newName = 'Viktor';

  const endState = userReducer(startState, { type: 'CHANGE-NAME', newName: newName });

  expect(endState.name).toBe(newName);
});
