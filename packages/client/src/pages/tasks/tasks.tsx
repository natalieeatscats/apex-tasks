import { Status, Task } from '../../types.ts';
import { Button, Empty, Layout, Row } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

import TaskColumn from './task-column/task-column.tsx';
import { useCreateTaskMutation } from '../../api/api.ts';

type Props = {
  taskList: Task[];
};

function Tasks({ taskList }: Props) {
  const [createTask] = useCreateTaskMutation();
  const taskListMutable = [...taskList];
  const onAdd = (status: Status) => {
    const newTask = {
      id: 'id',
      name: 'New Task',
      status: status,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'userId'
    };
    taskListMutable.push(newTask);
    createTask({ name: newTask.name, status: newTask.status });
  };
  return (
    <Layout>
      <Header>Your tasks</Header>
      <Content style={{ padding: '20px 50px' }}>
        {taskListMutable.length > 0 ? (
          <Row gutter={32}>
            <TaskColumn
              span={8}
              tasks={taskListMutable}
              status="notStarted"
              onAdd={() => onAdd(Status['NOT_STARTED'])}
            ></TaskColumn>
            <TaskColumn
              span={8}
              tasks={taskListMutable}
              status="inProgress"
              onAdd={() => onAdd(Status['IN_PROGRESS'])}
            ></TaskColumn>
            <TaskColumn
              span={8}
              tasks={taskListMutable}
              status="done"
              onAdd={() => onAdd(Status['DONE'])}
            ></TaskColumn>
          </Row>
        ) : (
          <Empty
            description={
              <>
                <p>You don't have any tasks</p>{' '}
                <Button
                  type="primary"
                  onClick={() => onAdd(Status['NOT_STARTED'])}
                >
                  Add Task
                </Button>
              </>
            }
          ></Empty>
        )}
      </Content>
    </Layout>
  );
}

export default Tasks;
