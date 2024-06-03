import AppLayout from './components/app-layout/app-layout.tsx';
import { Button, ConfigProvider, Result } from 'antd';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Tasks from './pages/tasks/tasks.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './types.ts';
import LoginPage from './pages/login/login.tsx';
import {
  useGetTasksQuery,
  useGetUsersQuery,
  useRememberQuery
} from './api/api.ts';
import RegisterPage from './pages/register/register.tsx';
import { useEffect, useState } from 'react';
import { setToken } from './api/store/slices/api/api-slice.ts';
import ProjectPage from './pages/project/project.tsx';
import { generateColor } from 'antd/es/color-picker/util';
import { generateColorPalettes } from 'antd/es/theme/themes/default/colors';
import ProtectedRoute from './components/protected-route/protected-route.tsx';
import { getContainerColor, getTextColor } from './helpers/theme.helper.ts';

function App() {
  const tasks = useSelector((state: State) => state.tasksState.tasks);
  const user = useSelector((state: State) => state.userState.activeUser);
  const userTasks = tasks.filter((task) => task.userId === user?.id);
  const savedToken =
    window.localStorage.getItem('apex-tasks-access_token') || '';
  const dispatch = useDispatch();
  useGetTasksQuery({});
  useGetUsersQuery({});
  useRememberQuery({});

  let initialColor =
    window.localStorage.getItem('apex-tasks-color') || '#325add';
  let palette = generateColorPalettes(initialColor);

  const onColorChange = (color: string) => {
    initialColor = color;
    window.localStorage.setItem('apex-tasks-color', color);
    palette = generateColorPalettes(initialColor);
    const isDark = generateColor(initialColor).toHsb().b < 0.7;
    if (isDark) {
      setColor({
        primary: palette[5],
        secondary: palette[2],
        text: getTextColor(palette[1], initialColor),
        container: getContainerColor(palette[10], initialColor),
        dark: isDark
      });
    } else {
      setColor({
        primary: palette[5],
        secondary: palette[2],
        text: getTextColor(palette[10], initialColor),
        container: getContainerColor(palette[1], initialColor),
        dark: isDark
      });
    }
  };

  const [color, setColor] = useState(() => {
    const isDark = generateColor(initialColor).toHsb().b < 0.7;
    if (isDark) {
      return {
        primary: palette[5],
        secondary: palette[2],
        text: getTextColor(palette[1], initialColor),
        container: getContainerColor(palette[10], initialColor),
        dark: isDark
      };
    } else {
      return {
        primary: palette[5],
        secondary: palette[2],
        text: getTextColor(palette[10], initialColor),
        container: getContainerColor(palette[1], initialColor),
        dark: isDark
      };
    }
  });

  const themeConfig = {
    token: {
      // Seed Token
      colorPrimary: color.primary,
      borderRadius: 10,
      fontFamily: 'Nunito Sans, sans-serif',
      colorText: color.text
    },
    components: {
      Layout: {
        headerBg: color.primary,
        headerColor: color.secondary,
        bodyBg: color.container
      }
    }
  };

  useEffect(() => {
    dispatch(setToken(savedToken));
  }, []);

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Russo+One&display=swap');
      </style>
      <BrowserRouter>
        <ConfigProvider theme={themeConfig}>
          <Routes>
            <Route
              element={
                <AppLayout onColorChange={onColorChange} dark={color.dark} />
              }
              path={'/'}
            >
              <Route
                element={
                  <ProtectedRoute guard={user !== null} redir={'/login'}>
                    <Tasks taskList={userTasks} />
                  </ProtectedRoute>
                }
                path={'tasks'}
              ></Route>
              <Route
                element={
                  <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                      <Button type="primary">
                        <Link to={'/'}>To Overview</Link>
                      </Button>
                    }
                  />
                }
                path={'*'}
              ></Route>
              <Route
                path={'login'}
                element={
                  <ProtectedRoute guard={user === null} redir={'/tasks'}>
                    <LoginPage />{' '}
                  </ProtectedRoute>
                }
              />
              <Route
                path={'register'}
                element={
                  <ProtectedRoute guard={user === null} redir={'/tasks'}>
                    <RegisterPage />
                  </ProtectedRoute>
                }
              />
              <Route path={''} element={<ProjectPage taskList={tasks} />} />{' '}
              <Route
                path={'settings'}
                element={
                  <Result
                    status="info"
                    title="Under Construction"
                    subTitle="Sorry, this page is still being developed"
                    extra={
                      <Button>
                        <Link to="/">To Overview</Link>
                      </Button>
                    }
                  />
                }
              ></Route>
              <Route
                path={'dashboard'}
                element={
                  <Result
                    status="info"
                    title="Under Construction"
                    subTitle="Sorry, this page is still being developed"
                    extra={
                      <Button>
                        <Link to="/">To Overview</Link>
                      </Button>
                    }
                  />
                }
              ></Route>
              <Route
                path={'team'}
                element={
                  <Result
                    status="info"
                    title="Under Construction"
                    subTitle="Sorry, this page is still being developed"
                    extra={
                      <Button>
                        <Link to="/">To Overview</Link>
                      </Button>
                    }
                  />
                }
              ></Route>
            </Route>
          </Routes>
        </ConfigProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
