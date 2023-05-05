import { useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Link from '@/components/Link'
import Container from '@mui/material/Container'
// import type { User } from '@supabase/supabase-js'

export default function Header() {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const supabase = useSupabaseClient()
  const session = useSession()

  function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  function signOut() {
    supabase.auth.signOut()
  }

  function handleSignOut() {
    signOut()
    router.push('/')
    handleMenuClose()
  }

  return (
    <AppBar position="static">
      <Container disableGutters maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link href="/" color="inherit" sx={{ textDecoration: 'none' }}>
            <img src="/logo.png" alt="" height="50px" />
          </Link>
          {session ? (
            <div>
              <Button color="inherit" onClick={handleMenuOpen}>
                {session.user.email}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" component={Link} href="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
