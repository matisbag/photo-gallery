import { useSession } from '@supabase/auth-helpers-react'
import { Box, Button, Container, Typography } from '@mui/material'
// import Image from 'next/image'
import Link from '@/components/Link'
// import LogoImage from '@/public/logo.png'

export default function Home() {
  const session = useSession()
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
            my: 4,
          }}
        >
          My Photo Gallery
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
        {session ? (
          <Button
            LinkComponent={Link}
            href="/gallery"
            variant="contained"
            color="primary"
            disableElevation
            sx={{
              mx: 2,
            }}
          >
            Go to Gallery
          </Button>
        ) : (
          <>
            <Button
              LinkComponent={Link}
              href="/signup"
              variant="contained"
              color="primary"
              disableElevation
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
          </>
        )}
      </Box>
    </Container>
  )
}
