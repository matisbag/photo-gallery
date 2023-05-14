import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Container, TextField, Typography, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Link from '@/components/Link'

interface AuthFormProps {
  type: 'login' | 'signup'
}

export default function AuthForm({ type }: AuthFormProps) {
  const user = useUser()
  const supabase = useSupabaseClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const { error } =
      type === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })
    if (error) {
      alert(error.message)
    } else {
      type === 'login' ? router.push('/') : router.push('/login')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      router.replace('/')
    }
  }, [user])

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        {type === 'login' ? 'Login' : 'Sign Up'}
      </Typography>
      <form onSubmit={handleAuth}>
        <TextField
          type="email"
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          disableElevation
          loading={loading}
          sx={{ mt: 4 }}
        >
          {type === 'login' ? 'Log in' : 'Sign up'}
        </LoadingButton>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 1,
          }}
        >
          Or&nbsp;
          <Link href={type === 'login' ? '/signup' : '/login'}>
            {type === 'login' ? 'Sign up' : 'Login'}
          </Link>
        </Box>
      </form>
    </Container>
  )
}
