import { Outlet } from 'react-router-dom';
import { Layout as DashboardLayout } from './layouts/dashboard/layout';
import IconsPage from './pages/icons';
import NotFoundPage from './pages/404';
import ReportsPage from './pages';
import Users from './pages/Users';
import Meal from './pages/Meal';
import EditMeal from './pages/edit-meal';
import EditUser from './pages/EditUser';
import Progresstrack from './pages/Progresstrack';
import EditProgress from './pages/Editprogress';
import { element } from 'prop-types';
import Excercisetracker from './pages/Excercisetracker';
import EditWorkout from './pages/Editexcercise';
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
        path: 'Users',
        element: <Users />
      },
      {
 path:"/edit-user/:id", element:<EditUser />

      },
      {
      path:"/edit-meal/:id" ,element:<EditMeal />
      },

      {
        path: 'Meal',
        element: <Meal/>
      }
      ,
      {
path : "Progresstrack",
element:<Progresstrack/>
      },
      {
 path:"/edit-progress/:id", element:<EditProgress />
      },
{
path : "Excercisetracker",
element:<Excercisetracker/>
},
{
 path:"/edit-workout/:id", element:<EditWorkout />
},
      {
        path: 'icons',
        element: <IconsPage />
      }
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
