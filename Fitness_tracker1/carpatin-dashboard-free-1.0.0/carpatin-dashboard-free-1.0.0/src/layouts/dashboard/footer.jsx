import { Box, Container, Link, Typography } from '@mui/material';

const items = [
  {
    label: 'About Us',
    href: 'https://yourfitnessapp.com/about'
  },
  {
    label: 'Terms & Conditions',
    href: 'https://yourfitnessapp.com/terms'
  }
];

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      background: 'linear-gradient(to right, #FF6B00, #FF8C42)',
      color: 'white',
      py: 3,
      mt: 'auto',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
    }}
  >
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row'
        },
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: {
          xs: 'center',
          sm: 'left'
        }
      }}
    >
      <Typography variant="body2" sx={{ mb: { xs: 1, sm: 0 } }}>
        © {new Date().getFullYear()} <strong>Fitness Tracker</strong>. All rights reserved.
      </Typography>

      <Box>
        {items.map((link, idx) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener"
            underline="hover"
            sx={{
              color: 'white',
              fontSize: 14,
              fontWeight: 500,
              ml: idx !== 0 ? 3 : 0
            }}
          >
            {link.label}
          </Link>
        ))}
      </Box>
    </Container>
  </Box>
);
