import { State, Task } from '../../../../types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const tasksSliceState: State['tasksState'] = {
  tasks: [],
  activeTask: null
};

const tasksSlice = createSlice({
  name: 'tasksState',
  initialState: tasksSliceState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    updateTask(state, action: PayloadAction<Partial<Task>>) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, ...action.payload };
        }
        return task;
      });
    },
    updateTasks(state, action: PayloadAction<Task>) {
      state.tasks = [...state.tasks, action.payload];
    },
    setActiveTask(state, action: PayloadAction<Task | null>) {
      state.activeTask = action.payload;
    }
  }
});

export const { setTasks, updateTask, setActiveTask, updateTasks } =
  tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
