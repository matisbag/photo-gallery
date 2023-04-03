import { useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Link from '@/components/Link'
// import type { User } from '@supabase/supabase-js'

export default function Header() {
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
    handleMenuClose()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" sx={{ color: 'white', textDecoration: 'none' }}>
            My App
          </Link>
        </Typography>
        {session ? (
          <div>
            <Button color="inherit" onClick={handleMenuOpen}>
              {session.user.email}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
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
    </AppBar>
  )
}
