import { Outlet } from 'react-router-dom';
import { Layout as DashboardLayout } from './layouts/dashboard/layout';
import IconsPage from './pages1/icons';
import NotFoundPage from './pages1/404';
import OrdersPage from './pages1/orders';
import ReportsPage from './pages1';
import SettingsPage from './pages1/settings';
import ThemePage from './pages1/theme';
import CreateCategory from './pages/Category/CreateCategory';
import DisplayCategory from './pages/Category/DisplayCategory';
import EditCategory from './pages/Category/EditCategory';
import CreateProduct from './pages/Category/CreateProduct';
import DisplayProduct from './pages/Category/DisplayProduct';

export const routes = [
  {
    element: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <ReportsPage />
      },
      {
        path: 'orders',
        element: <OrdersPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'theme',
        element: <ThemePage />
      },
      {
        path: 'icons',
        element: <IconsPage />
      },
      {
        path: 'create-category',
        element: <CreateCategory />
      },
      {
        path: 'display-category',
        element: <DisplayCategory />
      },
      {
        path: 'edit-category/:id',
        element: <EditCategory />
      },
      {
        path: 'create-product',
        element: <CreateProduct />
      },
      {
        path: 'display-product',
        element: <DisplayProduct />
      },
    ]
  },
  {
    path: '404',
    element: <NotFoundPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];
