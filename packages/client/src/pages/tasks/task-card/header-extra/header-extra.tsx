import { Dropdown, MenuProps, Popover } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import ReactTimeAgo from 'react-time-ago';
import Text from 'antd/es/typography/Text';

const items: MenuProps['items'] = [
  {
    key: 'notStarted',
    label: 'Not Started'
  },
  {
    key: 'inProgress',
    label: 'In Progress'
  },
  {
    key: 'done',
    label: 'Done'
  },
  {
    key: 'delete',
    danger: true,
    label: 'Delete'
  }
];

const HeaderExtra = ({
  updatedAt,
  createdAt,
  hover,
  status,
  changeStatus,
  deleteTask,
  displayMenu
}: {
  updatedAt: Date;
  createdAt: Date;
  hover: boolean;
  status: 'notStarted' | 'inProgress' | 'done';
  changeStatus: (status: 'notStarted' | 'inProgress' | 'done') => void;
  deleteTask: () => void;
  displayMenu: boolean;
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {updatedAt > createdAt ? (
        <Popover
          content={
            <>
              edited <ReactTimeAgo date={updatedAt} />
            </>
          }
        >
          <Text type="secondary">
            <ReactTimeAgo date={createdAt} />
          </Text>
        </Popover>
      ) : (
        <Text type="secondary">
          <ReactTimeAgo date={createdAt} />
        </Text>
      )}
      {displayMenu && (
        <div
          style={
            hover
              ? {
                  opacity: '100%',
                  marginLeft: '15px',
                  transition: 'all ease 0.3s'
                }
              : {
                  opacity: '0%',
                  marginLeft: '15px',
                  transition: 'all ease 0.3s'
                }
          }
        >
          <Dropdown
            menu={{
              items: items,
              selectable: true,
              defaultSelectedKeys: [status],
              onClick: ({ key }) => {
                switch (key) {
                  case 'notStarted':
                    changeStatus('notStarted');
                    break;
                  case 'inProgress':
                    changeStatus('inProgress');
                    break;
                  case 'done':
                    changeStatus('done');
                    break;
                  case 'delete':
                    deleteTask();
                    break;
                }
              }
            }}
          >
            <MenuOutlined />
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default HeaderExtra;
