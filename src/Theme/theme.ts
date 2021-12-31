import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
export const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     // main: '#f00',
  //   },
  //   secondary: {
  //     // main: '#0f0',
  //   },
  // },
  typography: {
    fontFamily: 'Comic Sans MS',
    body2: {
      fontFamily: 'Times New Roman',
      fontSize: '1.1rem',
    },
  },
  // spacing: 8,
  overrides: {},
  props: {},
});
