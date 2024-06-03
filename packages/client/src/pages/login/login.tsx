import { Button, Flex, Form, Input, Space, Spin } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/api.ts';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../types.ts';

const LoginPage = () => {
  const [normal_login] = Form.useForm();
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const isAuth = useSelector((state: State) => state.apiState.isAuth);
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      await login(normal_login.getFieldsValue());
      if (isSuccess) {
        navigate('/tasks');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/tasks');
    }
  }, []);

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
        form={normal_login}
        name="normal_login"
        className="login-form"
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
        <Flex justify="center" style={{ height: '5vh' }}>
          {isLoading ? (
            <Spin />
          ) : (
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <Link to="/register">register now!</Link>
              </Space>
            </Form.Item>
          )}
        </Flex>
      </Form>
    </div>
  );
};

export default LoginPage;
