import { ColorPicker, Menu as AntdMenu } from 'antd';
import { State } from '../../types.ts';
import { useLogoutMutation } from '../../api/api.ts';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChartOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ProjectOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/es/menu/SubMenu';

const Menu = ({
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
    <AntdMenu theme={dark ? 'dark' : 'light'}>
      {!isAuth ? (
        <AntdMenu.Item icon={<UserOutlined />}>
          <Link to={'/login'}>Log In</Link>
        </AntdMenu.Item>
      ) : (
        <SubMenu title={user?.name} icon={<UserOutlined />}>
          <AntdMenu.Item disabled>
            <ColorPicker
              disabledAlpha
              onChangeComplete={(hex) => onColorChange(hex.toHexString())}
              defaultValue={
                window.localStorage.getItem('apex-tasks-color') || '#325add'
              }
              format="hex"
              size="small"
              showText={(color) => <span>Theme: ({color.toHexString()})</span>}
            />
          </AntdMenu.Item>
          <AntdMenu.Item icon={<BarChartOutlined />}>
            <Link to={'/'}>Dashboard</Link>
          </AntdMenu.Item>
          <AntdMenu.Item icon={<SettingOutlined />}>
            <Link to={'/settings'}>Settings</Link>
          </AntdMenu.Item>
          <AntdMenu.Item icon={<LogoutOutlined />} danger onClick={onSignOut}>
            Sign Out
          </AntdMenu.Item>
        </SubMenu>
      )}
      <AntdMenu.Divider></AntdMenu.Divider>
      <AntdMenu.Item icon={<ProjectOutlined />}>
        <Link to={'/project'}>Project Overview</Link>
      </AntdMenu.Item>
      {isAuth && (
        <AntdMenu.Item icon={<ProfileOutlined />}>
          <Link to={'/tasks'}>Your Tasks</Link>
        </AntdMenu.Item>
      )}
      <AntdMenu.Divider></AntdMenu.Divider>
      <AntdMenu.Item icon={<TeamOutlined />}>
        <Link to={'/team'}>Team</Link>
      </AntdMenu.Item>
    </AntdMenu>
  );
};

export default Menu;
