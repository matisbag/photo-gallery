import { Box, Button, Container, Typography } from '@mui/material'
// import Image from 'next/image'
import Link from '@/components/Link'
// import LogoImage from '@/public/logo.png'

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src="logo.png" height="150" alt="Logo" />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            mb: 4,
          }}
        >
          My Google Photos
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          mb: '20px',
          textAlign: 'center',
        }}
      >
        This is a simplified version of Google Photos where you can store and
        organize your photos in the cloud.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          LinkComponent={Link}
          href="/signup"
          variant="contained"
          color="primary"
          sx={{
            mx: 2,
          }}
        >
          Sign Up
        </Button>
        <Button
          LinkComponent={Link}
          href="/login"
          variant="outlined"
          color="primary"
          sx={{
            mx: 2,
          }}
        >
          Log In
        </Button>
      </Box>
    </Container>
  )
}
