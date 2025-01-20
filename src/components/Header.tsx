import { AppBar, Box, Toolbar } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar>
        <Box
          sx={{
            bgcolor: "primary.main",
          }}
        >
          <img src="/sartorius-logo.svg" height="30px" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
