import TaskColumn from '../tasks/task-column/task-column.tsx';
import { Empty, Layout, Row } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Task } from '../../types.ts';

const ProjectPage = ({ taskList }: { taskList: Task[] }) => {
  return (
    <Layout>
      <Header>Project tasks</Header>
      <Content style={{ padding: '20px 50px' }}>
        {taskList.length > 0 ? (
          <Row gutter={32}>
            <TaskColumn
              span={12}
              tasks={taskList}
              status="notStarted"
            ></TaskColumn>
            <TaskColumn
              span={12}
              tasks={taskList}
              status="inProgress"
            ></TaskColumn>
          </Row>
        ) : (
          <Empty
            description={
              <>
                <p>No open tasks</p>{' '}
              </>
            }
          ></Empty>
        )}
      </Content>
    </Layout>
  );
};

export default ProjectPage;
