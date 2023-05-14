import * as React from 'react'
import Typography from '@mui/material/Typography'

export default function Footer() {
  return (
    <footer>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ p: 1 }}>
        © {new Date().getFullYear()} photo-gallery
      </Typography>
    </footer>
  )
}
