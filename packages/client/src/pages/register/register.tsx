import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRegisterMutation } from '../../api/api.ts';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [register_form] = Form.useForm();
  const [register, { isSuccess, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const onFinish = () => {
    const values = register_form.getFieldsValue([
      ['email'],
      ['name'],
      ['password']
    ]);
    console.log(values);
    register(values);
    if (isSuccess) {
      navigate('/tasks');
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Form
        form={register_form}
        name="register"
        className="register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: '20vw' }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your E-mail!' }]}
          validateStatus={error ? 'error' : ''}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
          />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
          validateStatus={error ? 'error' : ''}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          validateStatus={error ? 'error' : ''}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirm-password"
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              }
            })
          ]}
          validateStatus={error ? 'error' : ''}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
