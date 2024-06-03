import { Button, ConfigProvider, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const EditingButtons = ({
  onConfirm,
  onCancel,
  isEditing
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isEditing: boolean;
}) => {
  if (!isEditing) return null;
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorText: '#52c41a',
              colorBgTextHover: 'rgba(217, 247, 190, 0.5)',
              colorBgTextActive: 'rgba(217, 247, 190, 1.0)'
            }
          }
        }}
      >
        <Tooltip title="Confirm" color={'green'} mouseEnterDelay={0.5}>
          <Button type="text" name="confirm" onClick={onConfirm}>
            <CheckOutlined></CheckOutlined>
          </Button>
        </Tooltip>
      </ConfigProvider>

      <Tooltip title="Cancel" color={'red'} mouseEnterDelay={0.5}>
        <Button type="text" name="cancel" danger={true} onClick={onCancel}>
          <CloseOutlined />
        </Button>
      </Tooltip>
    </div>
  );
};

export default EditingButtons;
