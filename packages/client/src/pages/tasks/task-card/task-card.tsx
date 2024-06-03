import { Card, Col, Flex, Form, Input, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { State, Task } from '../../../types.ts';
import { useState } from 'react';
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation
} from '../../../api/api.ts';
import FormItem from 'antd/es/form/FormItem';
import EditingButtons from './editing-buttons/editing-buttons.tsx';
import { useSelector } from 'react-redux';
import HeaderExtra from './header-extra/header-extra.tsx';
import Text from 'antd/es/typography/Text';

const TaskCard = (props: { task: Task }) => {
  const createdAt = new Date(props.task.createdAt);
  const updatedAt = new Date(props.task.updatedAt);
  const taskId = props.task.id;
  const taskCreator = useSelector((state: State) => state.userState.users).find(
    (user) => user.id === props.task.userId
  )!;
  const isOwnTask =
    useSelector((state: State) => state.userState.activeUser?.id) ===
    taskCreator?.id;
  const [hover, setHover] = useState(false);
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [task] = Form.useForm();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const onConfirmName = () => {
    task
      .validateFields(['taskname'])
      .then(() => {
        updateTask({
          id: taskId,
          data: {
            name: task.getFieldValue('taskname')
          }
        });
        setIsEditingName(false);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };
  const onCancelName = () => {
    task.resetFields(['taskname']);
    setIsEditingName(false);
  };
  const onConfirmDesc = () => {
    task
      .validateFields(['taskdesc'])
      .then(() => {
        updateTask({
          id: taskId,
          data: {
            desc: task.getFieldValue('taskdesc')
          }
        });
        setIsEditingDesc(false);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };
  const onCancelDesc = () => {
    task.resetFields(['taskdesc']);
    setIsEditingDesc(false);
  };
  const onChangeStatus = (status: 'notStarted' | 'inProgress' | 'done') => {
    updateTask({
      id: taskId,
      data: {
        status
      }
    });
  };
  const onDeleteTask = () => {
    deleteTask({ id: taskId });
  };

  return (
    <Card
      hoverable
      key={props.task.id}
      style={{ margin: '10px' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Form form={task}>
        <FormItem
          style={{ marginBottom: 0 }}
          rules={[
            {
              required: true,

              type: 'string',

              min: 8,

              max: 40,

              message: 'Task name must be between 8 and 40 characters long'
            }
          ]}
          name="taskname"
          required
        >
          <Row>
            <Col span={16}>
              <Input
                defaultValue={props.task.name}
                variant="borderless"
                onChange={(e) => {
                  task.setFieldsValue({ taskname: e.target.value });
                  setIsEditingName(true);
                }}
                onPressEnter={onConfirmName}
                disabled={!isOwnTask}
              ></Input>
            </Col>
            <Col span={8}>
              <Flex justify="end" align="center" style={{ height: '100%' }}>
                {isEditingName ? (
                  <EditingButtons
                    onConfirm={onConfirmName}
                    onCancel={onCancelName}
                    isEditing={isEditingName}
                  />
                ) : (
                  <Flex align="center">
                    {!isOwnTask && (
                      <Text type="secondary">
                        {`${taskCreator.name},`}&nbsp;
                      </Text>
                    )}
                    <HeaderExtra
                      createdAt={createdAt}
                      updatedAt={updatedAt}
                      hover={hover}
                      status={props.task.status}
                      changeStatus={onChangeStatus}
                      deleteTask={onDeleteTask}
                      displayMenu={isOwnTask}
                    />
                  </Flex>
                )}
              </Flex>
            </Col>
          </Row>
        </FormItem>{' '}
        <FormItem
          style={{ marginBottom: 0 }}
          name="taskdesc"
          rules={[
            {
              type: 'string',
              max: 3000,
              message: 'Task description can not be longer than 3000 characters'
            }
          ]}
        >
          <TextArea
            autoSize={{ minRows: 1, maxRows: 10 }}
            variant="borderless"
            defaultValue={props.task.desc}
            placeholder="No description"
            onChange={(e) => {
              task.setFieldsValue({ taskdesc: e.target.value });
              setIsEditingDesc(true);
            }}
            onPressEnter={onConfirmDesc}
            disabled={!isOwnTask}
          ></TextArea>
        </FormItem>
      </Form>
      <EditingButtons
        onConfirm={onConfirmDesc}
        onCancel={onCancelDesc}
        isEditing={isEditingDesc}
      />
    </Card>
  );
};

export default TaskCard;
