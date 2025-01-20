import { Container, Box } from "@mui/material";

export const AppDescription = () => {
  return (
    <Container sx={{ mt: 2, mb: 3 }}>
      <Box sx={{ mb: 3, fontSize: 40 }}>URL Shortener</Box>
      <Box sx={{ lineHeight: 1.4 }}>
        The URL Shortener is a tool for shortening a long URL in order to
        provide better readability and more precise branded naming. A user
        clicking on the Short URL or scanning the QR Code will land on the exact
        same website like when entering the original URL in a browser.
      </Box>
    </Container>
  );
};
