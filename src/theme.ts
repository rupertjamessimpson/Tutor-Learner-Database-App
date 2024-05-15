import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#4EC1C0', // Your main teal color
      },
      secondary: { // Optional secondary color (e.g., for buttons)
        main: '#F9B87F', // Light orange
      },
      background: { // Background color options
        default: '#F5F5F5', // Very light gray
        paper: '#E0E0E0', // Light gray for content areas
      },
      text: { // Text color options
        primary: '#333333', // Black for main text
        secondary: '#999999', // Dark gray for secondary text
      },
    },
  });

export default theme;