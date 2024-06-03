import { Status, Task } from '../../types.ts';
import { Layout, Row } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

import TaskColumn from './task-column/task-column.tsx';
import { useCreateTaskMutation } from '../../api/api.ts';

function Tasks({ taskList }: { taskList: Task[] }) {
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
      </Content>
    </Layout>
  );
}

export default Tasks;
