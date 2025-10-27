import ChartPieIcon from "@heroicons/react/24/solid/ChartPieIcon"
import CogIcon from "@heroicons/react/24/solid/CogIcon"
import DocumentTextIcon from "@heroicons/react/24/solid/DocumentTextIcon"
import ExclamationTriangleIcon from "@heroicons/react/24/solid/ExclamationTriangleIcon"
import ShoppingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon"
import StarIcon from "@heroicons/react/24/solid/StarIcon"
import { SvgIcon } from '@mui/material';

export const items = [

  {
    href: '/Users',
    icon: (
      <SvgIcon>
        <ChartPieIcon />
      </SvgIcon>
    ),
    label: 'Users'
  },
 

  {
    href: '/Meal',
    icon: (
      <SvgIcon>
        <ChartPieIcon />
      </SvgIcon>
    ),
    label: 'Meal'
  },
  
  {
    href: '/Progresstrack',
    icon: (
      <SvgIcon>
        <ChartPieIcon />
      </SvgIcon>
    ),
    label: 'ProgressTracker'
  },
    {
    href: '/Excercisetracker',
    icon: (
      <SvgIcon>
        <ChartPieIcon />
      </SvgIcon>
    ),
    label: 'ExcerciseTracker'
  },



  // {
  //   href: '/icons',
  //   icon: (
  //     <SvgIcon>
  //       <StarIcon />
  //     </SvgIcon>
  //   ),
  //   label: 'Icons'
  // },
  // {
  //   href: '/404',
  //   icon: (
  //     <SvgIcon>
  //       <ExclamationTriangleIcon />
  //     </SvgIcon>
  //   ),
  //   label: 'Error'
  // }
];
