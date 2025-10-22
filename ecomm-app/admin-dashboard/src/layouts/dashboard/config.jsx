import ChartPieIcon from "@heroicons/react/24/solid/ChartPieIcon"
import CogIcon from "@heroicons/react/24/solid/CogIcon"
import DocumentTextIcon from "@heroicons/react/24/solid/DocumentTextIcon"
import ExclamationTriangleIcon from "@heroicons/react/24/solid/ExclamationTriangleIcon"
import ShoppingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon"
import StarIcon from "@heroicons/react/24/solid/StarIcon"
import { SvgIcon } from '@mui/material';

export const items = [
  {
    href: '/',
    icon: (
      <SvgIcon>
        <ChartPieIcon />
      </SvgIcon>
    ),
    label: 'Home'
  },
  {
    href: '/create-category',
    icon: (
      <SvgIcon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </SvgIcon>
    ),
    label: 'Create Category'
  },
  {
    href: '/display-category',
    icon: (
      <SvgIcon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>


      </SvgIcon>
    ),
    label: 'Display Category'
  },
  {
    href: '/create-product',
    icon: (
      <SvgIcon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </SvgIcon>
    ),
    label: 'Create Product'
  },{
    href: '/display-product',
    icon: (
      <SvgIcon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>


      </SvgIcon>
    ),
    label: 'Display Product'
  },
  // {
  //   href: '/orders',
  //   icon: (
  //     <SvgIcon>
  //       <ShoppingCartIcon />
  //     </SvgIcon>
  //   ),
  //   label: 'Orders'
  // },
  // {
  //   href: '/settings',
  //   icon: (
  //     <SvgIcon>
  //       <CogIcon />
  //     </SvgIcon>
  //   ),
  //   label: 'Settings'
  // },
  // {
  //   href: '/theme',
  //   icon: (
  //     <SvgIcon>
  //       <DocumentTextIcon />
  //     </SvgIcon>
  //   ),
  //   label: 'Theme'
  // },
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
