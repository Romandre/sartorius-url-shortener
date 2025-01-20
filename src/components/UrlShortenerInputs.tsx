import {
  Alert,
  Box,
  Button,
  Container,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { isUrlValid, extractPathOrDomain } from "../utils";
import { useShortUrlContext } from "../context/ShortUrlContext";

export const UrlShortenerInputs = () => {
  const { createShortUrl, isCreating, alert, pushAlert, resetAlert } =
    useShortUrlContext();
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const inputStyle = { bgcolor: "#FFFFFF", minWidth: "500px" };

  const handleUrlCreation = () => {
    if (!longUrl) pushAlert("Provide URL for generation", "warning");

    if (longUrl && !isUrlValid(longUrl))
      pushAlert("Provided data is not a valid URL", "warning");

    if (longUrl && isUrlValid(longUrl)) {
      createShortUrl({
        fullUrl: longUrl,
        shortUrl: shortUrl?.trim() ? shortUrl : extractPathOrDomain(longUrl),
      });
      setLongUrl("");
      setShortUrl("");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        p: 4,
      }}
    >
      <Snackbar
        open={alert.isOpen}
        onClose={resetAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
      >
        <Alert
          onClose={resetAlert}
          severity={alert.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Container>
        <InputLabel sx={{ color: "#FFFFFF" }}>
          Enter the URL you want to shorten
        </InputLabel>
        <Input
          sx={inputStyle}
          value={longUrl}
          placeholder="https://example-url.com/very-long-pathname"
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <InputLabel sx={{ mt: 2, color: "#FFFFFF" }}>
          Customize the shortened URL (optional)
        </InputLabel>
        <Input
          sx={inputStyle}
          value={shortUrl}
          startAdornment={
            <InputAdornment position="start">
              {import.meta.env.VITE_SHORT_URL_PREFIX}
            </InputAdornment>
          }
          placeholder="your-short-url"
          onChange={(e) => setShortUrl(e.target.value)}
        />
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            disabled={isCreating}
            onClick={handleUrlCreation}
          >
            Create Short URL
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
