// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,      // Mobile: 0px
      sm: 600,    // Small tablet: 600px
      md: 768,    // Tablet: 768px
      lg: 1024,   // Desktop: 1024px
      xl: 1280,   // Large desktop: 1280px
    },
  },
  palette: {
    primary: {
      main: '#f0ae4bff', // your custom orange
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'Cinzel, cursive',
    h1: {
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
      '@media (min-width:1024px)': {
        fontSize: '5rem',
      },
    },
    h2: {
      fontSize: '1.8rem',
      '@media (min-width:600px)': {
        fontSize: '2.2rem',
      },
      '@media (min-width:1024px)': {
        fontSize: '2.8rem',
      },
    },
    h3: {
      fontSize: '1.4rem',
      '@media (min-width:600px)': {
        fontSize: '1.8rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Cinzel, cursive',
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 12px',
          fontWeight: 'bold',
          boxShadow: 'none',
          minHeight: '44px',
          minWidth: '44px',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#c08a38ff'
          },
          margin: '8px',
          '@media (max-width:600px)': {
            padding: '10px 14px',
            minHeight: '48px',
            minWidth: '48px',
            fontSize: '0.9rem',
          },
        },
        sizeSmall: {
          padding: '4px 8px',
          margin: '4px',
          fontSize: '0.75rem',
          minHeight: 'auto',
          minWidth: 'auto',
          '@media (max-width:600px)': {
            padding: '6px 10px',
            fontSize: '0.85rem',
          }
        },
        sizeLarge: {
          padding: '10px 14px',
          fontSize: '1.1rem',
          marginLeft: '12px',
          marginRight: '12px',
          '@media (max-width:600px)': {
            padding: '12px 16px',
            fontSize: '1rem',
            marginLeft: '6px',
            marginRight: '6px',
          },
          '@media (max-width:768px)': {
            fontSize: '1.2rem',
          }
        }
      },
      defaultProps: {
        variant: 'contained',
        color: 'primary'
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontFamily: "Cinzel, Cormorant Garamond, Georgia, serif",
          fontSize: "1rem",
          color: "#2b2520",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "6px",
          padding: "0.5rem",
          border: "1px solid #b0893f",
          boxShadow: "inset 0 0 0 1px rgba(176, 137, 63, 0.3)",
          '@media (max-width:600px)': {
            fontSize: '1.1rem',
            padding: '0.75rem',
          }
        }
      }
  }
}});

export default theme;
