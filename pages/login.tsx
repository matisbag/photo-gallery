import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Container, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

export default function Login() {
  const supabase = useSupabaseClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      alert(error.message)
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
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
            Log in
          </LoadingButton>
        </form>
      </Container>
    </>
  )
}
