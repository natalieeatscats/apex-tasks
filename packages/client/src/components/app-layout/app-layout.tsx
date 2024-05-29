import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { ColorPicker, Flex, Layout, Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  BarChartOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ProjectOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { State } from '../../types.ts';
import SubMenu from 'antd/es/menu/SubMenu';
import { useLogoutMutation } from '../../api/api.ts';

const AppLayout = ({
  onColorChange,
  dark
}: {
  onColorChange: (color: string) => void;
  dark: boolean;
}) => {
  const isAuth = useSelector((state: State) => state.apiState.isAuth);
  const user = useSelector((state: State) => state.userState.activeUser);
  const [signOut] = useLogoutMutation({});
  const navigate = useNavigate();
  const onSignOut = async () => {
    await signOut({});
    navigate('/login');
  };

  return (
    <Layout>
      <Sider theme={dark ? 'dark' : 'light'} collapsible>
        <Menu mode="inline" theme={dark ? 'dark' : 'light'}>
          {!isAuth ? (
            <Menu.Item icon={<UserOutlined />}>
              <Link to={'/login'}>Log In</Link>
            </Menu.Item>
          ) : (
            <SubMenu title={user?.name} icon={<UserOutlined />}>
              <Menu.Item icon={<BarChartOutlined />}>
                <Link to={'/'}>Dashboard</Link>
              </Menu.Item>
              <Menu.Item icon={<SettingOutlined />}>
                <Link to={'/settings'}>Settings</Link>
              </Menu.Item>
              <Menu.Item icon={<LogoutOutlined />} danger onClick={onSignOut}>
                Sign Out
              </Menu.Item>
            </SubMenu>
          )}
          <Menu.Divider></Menu.Divider>
          <Menu.Item icon={<ProjectOutlined />}>
            <Link to={'/project'}>Project Overview</Link>
          </Menu.Item>
          {isAuth && (
            <Menu.Item icon={<ProfileOutlined />}>
              <Link to={'/tasks'}>Your Tasks</Link>
            </Menu.Item>
          )}
          <Menu.Divider></Menu.Divider>
          <Menu.Item icon={<TeamOutlined />}>
            <Link to={'/team'}>Team</Link>
          </Menu.Item>
        </Menu>
        <Flex align="center" justify="center">
          <ColorPicker
            disabledAlpha
            onChangeComplete={(hex) => onColorChange(hex.toHexString())}
            defaultValue={
              window.localStorage.getItem('apex-tasks-color') || '#325add'
            }
            format="hex"
          />
        </Flex>
      </Sider>
      <Content style={{ maxHeight: '100vh', height: '100vh' }}>
        <Outlet></Outlet>
      </Content>
    </Layout>
  );
};
export default AppLayout;
