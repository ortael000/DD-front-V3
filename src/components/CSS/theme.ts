// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f0ae4bff', // your custom orange
      contrastText: '#ffffff'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Cinzel, cursive',
          borderRadius: 8,
          textTransform: 'none',
          padding: '6px 10px',
          fontWeight: 'bold',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#c08a38ff'
          },
          margin: '8px',
        },
        sizeSmall: {
          padding: '2px 4px',
          margin: '2px',
          fontSize: '0.75rem'
        },
        // large variant
        sizeLarge: {
          padding: '8px 12px',
          fontSize: '1.2rem',
          marginLeft: '12px',
          marginRight: '12px'
        }
      },
      defaultProps: {
        variant: 'contained',
        color: 'primary'
      }
    }
  }
});

export default theme;
