export type Task = {
  id: string;
  name: string;
  desc?: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export enum Status {
  NOT_STARTED = 'notStarted',
  IN_PROGRESS = 'inProgress',
  DONE = 'done'
}

export type User = {
  id: string;
  name: string;
  email: string;
  tasks: Task[];
};

export type State = {
  tasksState: {
    tasks: Task[];
    activeTask: Task | null;
  };
  userState: {
    users: User[];
    activeUser: User | null;
  };
  apiState: {
    isAuth: boolean;
    token: string;
  };
};
