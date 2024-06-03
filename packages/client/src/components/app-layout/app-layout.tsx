import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from '../layout-wrapper/layout-wrapper.tsx';
import Menu from '../menu/menu.tsx';

const AppLayout = ({
  onColorChange,
  dark
}: {
  onColorChange: (color: string) => void;
  dark: boolean;
}) => {
  return (
    <LayoutWrapper>
      <Sider theme={dark ? 'dark' : 'light'} collapsible>
        <Menu dark={dark} onColorChange={onColorChange}></Menu>
      </Sider>
      <Content style={{ maxHeight: '100vh', height: '100vh' }}>
        <Outlet></Outlet>
      </Content>
    </LayoutWrapper>
  );
};
export default AppLayout;
