import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Link, Stack, Typography } from '@mui/material';
import { Logo } from 'src/components/logo';

const TOP_NAV_HEIGHT = 64;

export const TopNav = () => (
  <Box
    component="header"
    sx={{
      backgroundColor: 'black',
      // background: 'linear-gradient(90deg, #FF6B00, #FF8C42)', // orange gradient
      color: 'common.white',
      position: 'fixed',
      width: '100%',
      height: TOP_NAV_HEIGHT,
      display: 'flex',
      alignItems: 'center',
      zIndex: (theme) => theme.zIndex.appBar,
      boxShadow: '0 2px 12px rgba(0,0,0,0.2)'
    }}
  >
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: '100%',
        px: 3
      }}
    >

      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'inline-flex',
            height: 32,
            width: 32,
            paddingLeft:2,
              justifyContent: "center",
              alignItems: "center",
          }}
        >
          {/* <Logo /> */}
          <img src="logo.png"  width='80' height='20'  alt="" />
        </Box>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: 'white', letterSpacing: 1 }}
          paddingLeft={3}
        >
          FITNESS TRACKER
        </Typography>
      </Stack>


      <Stack direction="row" spacing={2} alignItems="center">
        {/* <Link
          color="inherit"
          href="https://mui.com/store/items/carpatin-dashboard"
          target="_blank"
          underline="hover"
          sx={{ fontWeight: 500 }}
        >
          See Pro Version
        </Link> */}
        <Avatar
          src="/assets/avatars/avatar-chen-simmons.jpg"
          variant="rounded"
          sx={{
            border: '2px solid white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        />
      </Stack>
    </Stack>
  </Box>
);
