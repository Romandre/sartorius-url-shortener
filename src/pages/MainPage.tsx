import { Box } from "@mui/material";
import { Header, AppDescription } from "../components";
import { UrlShortenerInputs } from "../components/UrlShortenerInputs";
import { UrlShortnerList } from "../components/UrlShortnerList";

export const MainPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ mt: 8 }}>
        <AppDescription />
        <UrlShortenerInputs />
        <UrlShortnerList />
      </Box>
    </>
  );
};
