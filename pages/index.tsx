import { useSession } from '@supabase/auth-helpers-react'
import { Box, Button, Container, Typography } from '@mui/material'
import Link from '@/components/Link'

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
        This is a simplified version of Google Photos where you can store and organize
        your photos in the cloud.
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
            href="/photos"
            variant="contained"
            disableElevation
          >
            Go to Gallery
          </Button>
        ) : (
          <>
            <Button
              LinkComponent={Link}
              href="/signup"
              variant="contained"
              disableElevation
              sx={{
                mx: 1,
              }}
            >
              Sign Up
            </Button>
            <Button
              LinkComponent={Link}
              href="/login"
              variant="outlined"
              sx={{
                mx: 1,
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
