import { createTheme } from "@mui/material/styles";
import tokens, { SartoriusThemeTokens } from "./tokens";

declare module "@mui/material/styles" {
  interface Theme {
    tokens: SartoriusThemeTokens;
  }
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: tokens.color.primary,
    },
    secondary: {
      main: tokens.color.secondary,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "&.MuiContainer-maxWidthLg": {
            maxWidth: "1238px",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          outline: "1px solid #fff",
          "@media (min-width: 600px)": {
            minHeight: "44px",
          },
          "@media (min-width: 0px)": {
            minHeight: "44px",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          padding: "8px 16px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          margin: "6px 0",
          fontWeight: 300,
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          paddingLeft: "16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          background: tokens.color.primary,
        },
      },
    },
  },
});

export default defaultTheme;
