import type {} from '@mui/lab/themeAugmentation'
import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  spacing: 8,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(!ownerState.disableGutters && {
            [theme.breakpoints.down('md')]: {
              paddingTop: theme.spacing(2),
              paddingBottom: theme.spacing(2),
            },
            [theme.breakpoints.up('md')]: {
              paddingTop: theme.spacing(4),
              paddingBottom: theme.spacing(4),
            },
          }),
        }),
      },
    },
  },
})

export default theme
