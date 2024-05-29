import { Task } from '../../../types.ts';
import { Button, Col, List, Space } from 'antd';
import './task-column.css';
import TaskCard from '../task-card/task-card.tsx';

function TaskColumn(props: {
  tasks: Task[];
  status: 'notStarted' | 'inProgress' | 'done';
  onAdd?: () => void;
  span: number;
}) {
  const tasks = props.tasks
    .filter((task) => task.status === props.status)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const title = {
    notStarted: 'Not Started',
    inProgress: 'In Progress',
    done: 'Done'
  };
  return (
    <Col span={props.span}>
      <List
        header={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {`${title[props.status]} - ${tasks.length}`}{' '}
            {props.onAdd && (
              <Button type="text" onClick={props.onAdd}>
                Add
              </Button>
            )}
          </div>
        }
        grid={{ gutter: 6 }}
      >
        <div className="container">
          <Space direction={'vertical'} style={{ width: '100%' }}>
            {tasks.map((task) => (
              <TaskCard task={task}></TaskCard>
            ))}
          </Space>
        </div>
      </List>
    </Col>
  );
}

export default TaskColumn;
