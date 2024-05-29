import { Card, Flex, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { State, Task } from '../../../types.ts';
import { useState } from 'react';
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation
} from '../../../api/api.ts';
import FormItem from 'antd/es/form/FormItem';
import EditingButtons from './editing-buttons/editing-buttons.tsx';
import HeaderExtra from './header-extra/header-extra.tsx';
import { useSelector } from 'react-redux';
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
  const [taskname] = Form.useForm();
  const [taskdesc] = Form.useForm();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const onConfirmName = () => {
    taskname
      .validateFields(['taskname'])
      .then(() => {
        updateTask({
          id: taskId,
          data: {
            name: taskname.getFieldValue('taskname')
          }
        });
        setIsEditingName(false);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };
  const onCancelName = () => {
    taskname.resetFields();
    setIsEditingName(false);
  };
  const onConfirmDesc = () => {
    taskdesc
      .validateFields(['taskdesc'])
      .then(() => {
        updateTask({
          id: taskId,
          data: {
            desc: taskdesc.getFieldValue('taskdesc')
          }
        });
        setIsEditingDesc(false);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };
  const onCancelDesc = () => {
    taskdesc.resetFields();
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
      title={
        <Form form={taskname}>
          <FormItem
            style={{ marginBottom: 0 }}
            rules={[
              {
                required: true,

                type: 'string',

                min: 8,

                max: 40
              }
            ]}
            name="taskname"
            required
          >
            <Input
              defaultValue={props.task.name}
              variant="borderless"
              onChange={(e) => {
                taskname.setFieldsValue({ taskname: e.target.value });
                setIsEditingName(true);
              }}
              onPressEnter={onConfirmName}
              disabled={!isOwnTask}
            ></Input>
          </FormItem>
        </Form>
      }
      extra={
        isEditingName ? (
          <EditingButtons
            onConfirm={onConfirmName}
            onCancel={onCancelName}
            isEditing={isEditingName}
          />
        ) : (
          <Flex align="center">
            {!isOwnTask && (
              <Text type="secondary">{`${taskCreator.name},`}&nbsp;</Text>
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
        )
      }
      hoverable
      key={props.task.id}
      style={{ margin: '10px' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Form form={taskdesc}>
        <FormItem
          style={{ marginBottom: 0 }}
          name="taskdesc"
          rules={[{ type: 'string', max: 3000 }]}
        >
          <TextArea
            autoSize={{ minRows: 1, maxRows: 10 }}
            maxLength={3000}
            showCount={isEditingDesc}
            variant="borderless"
            defaultValue={props.task.desc}
            placeholder="No description"
            onChange={(e) => {
              taskdesc.setFieldsValue({ taskdesc: e.target.value });
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
