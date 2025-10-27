import { Helmet } from 'react-helmet-async';
import { subDays, subHours, subMinutes } from 'date-fns';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import {
  Avatar,
  Box,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';

import { OverviewKpi } from 'src/sections/overview/overview-kpi';
import { OverviewLatestCustomers } from 'src/sections/overview/overview-latest-customers';
import { OverviewSummary } from 'src/sections/overview/overview-summary';

const now = new Date();

const Page = () => (
  <>
    <Helmet>
      <title>Dashboard | Fitness Tracker</title>
    </Helmet>
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
        background: 'linear-gradient(to right, #fff9f0, #ffe8d6)',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          {/* <Typography
            variant="h3"
            fontWeight={800}
            color="#FF6B00"
            textAlign="center"
          >
            🏋️‍♂️ Fitness Tracker Dashboard
          </Typography> */}

          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <OverviewSummary
                icon={
                  <Avatar
                    sx={{
                      backgroundColor: '#FF6B00',
                      color: 'white',
                      height: 56,
                      width: 56
                    }}
                  >
                    <SvgIcon>
                      <ShoppingBagIcon />
                    </SvgIcon>
                  </Avatar>
                }
                label="Total Workouts"
                value="5610"
              />
            </Grid>

            <Grid xs={12} md={4}>
              <OverviewSummary
                icon={
                  <Avatar
                    sx={{
                      backgroundColor: '#FF6B00',
                      color: 'white',
                      height: 56,
                      width: 56
                    }}
                  >
                    <SvgIcon>
                      <ShoppingCartIcon />
                    </SvgIcon>
                  </Avatar>
                }
                label="Active Members"
                value="23"
              />
            </Grid>

            <Grid xs={12} md={4}>
              <OverviewSummary
                icon={
                  <Avatar
                    sx={{
                      backgroundColor: '#FF6B00',
                      color: 'white',
                      height: 56,
                      width: 56
                    }}
                  >
                    <SvgIcon>
                      <CurrencyDollarIcon />
                    </SvgIcon>
                  </Avatar>
                }
                label="Total Revenue"
                value="$1,942"
              />
            </Grid>

            <Grid xs={12}>
              <OverviewKpi
                chartSeries={[
                  {
                    data: [0, 20, 40, 30, 30, 44, 90],
                    name: 'Calories Burned'
                  }
                ]}
                stats={[
                  {
                    label: 'Total Burned',
                    value: '4,800 kcal'
                  },
                  {
                    label: 'Avg Burn/Day',
                    value: '690 kcal'
                  },
                  {
                    label: 'Active Users',
                    value: '120'
                  },
                  {
                    label: 'Workouts Logged',
                    value: '6,900'
                  },
                  {
                    label: 'Goals Reached',
                    value: '80%'
                  }
                ]}
              />
            </Grid>

           <Grid xs={12}>
  <Box
    sx={{
      mt: 4,
      p: 2,
      borderRadius: 3,
      backgroundColor: '#fff4e6',
      border: '1px solid #ffa726',
      boxShadow: '0 4px 12px rgba(255, 107, 0, 0.1)',
    }}
  >
    <Typography
      variant="h6"
      sx={{
        mb: 2,
        fontWeight: 700,
        color: '#FF6B00',
        textAlign: 'center',
        textTransform: 'uppercase',
      }}
    >
      Latest Members Activity
    </Typography>

    <OverviewLatestCustomers
      customers={[
        {
          id: 'a105ac46530704806ca58ede',
          amountSpent: 684.45,
          avatar: '/assets/avatars/avatar-fabiano-jorioz.jpg',
          createdAt: subDays(subHours(subMinutes(now, 7), 3), 2).getTime(),
          isOnboarded: true,
          name: 'Fabiano Jorioz',
          orders: 2
        },
        {
          id: '126ed71fc9cbfabc601c56c5',
          amountSpent: 0,
          avatar: '/assets/avatars/avatar-meggie-heinonen.jpg',
          createdAt: subDays(subHours(subMinutes(now, 7), 3), 2).getTime(),
          isOnboarded: false,
          name: 'Meggie Heinonen',
          orders: 0
        },
        {
          id: 'aafaeb0545357922aff32a7b',
          amountSpent: 32.25,
          avatar: '/assets/avatars/avatar-sean-picott.jpg',
          createdAt: subDays(subHours(subMinutes(now, 11), 2), 3).getTime(),
          isOnboarded: true,
          name: 'Sean Picott',
          orders: 1
        },
        {
          id: '16b526d9e0fefe53f7eba66b',
          amountSpent: 0,
          avatar: '/assets/avatars/avatar-bell-covely.jpg',
          createdAt: subDays(subHours(subMinutes(now, 18), 9), 5).getTime(),
          isOnboarded: true,
          name: 'Bell Covely',
          orders: 0
        },
        {
          id: 'fe035356923629912236d9a2',
          amountSpent: 125.70,
          avatar: '/assets/avatars/avatar-giraud-lamlin.jpg',
          createdAt: subDays(subHours(subMinutes(now, 19), 18), 7).getTime(),
          isOnboarded: false,
          name: 'Giraud Lamlin',
          orders: 1
        }
      ]}
    />
  </Box>
</Grid>

          </Grid>
        </Stack>
      </Container>
    </Box>
  </>
);

export default Page;
