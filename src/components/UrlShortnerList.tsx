import {
  Container,
  Box,
  Tooltip,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  CircularProgress,
} from "@mui/material";
import { useShortUrlContext } from "../context/ShortUrlContext";
import { ShortUrl } from "../types";

// Icons
import { MdContentCopy } from "react-icons/md";
import { IoQrCodeOutline } from "react-icons/io5";

export const UrlShortnerList = () => {
  const { urls, isLoading, error } = useShortUrlContext();

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <Container>
      <TableToolbar />
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={80} />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box>Shortened URL</Box>
                    <Box sx={{ opacity: 0.5 }}>Original URL</Box>
                  </TableCell>
                  <TableCell align="left" sx={{ width: 300 }}>
                    Creation date
                  </TableCell>
                  <TableCell>&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {urls.map((url: ShortUrl) => (
                  <StyledTableRow
                    key={url.shortUrl}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ width: 600 }}>
                      <Box>
                        {url.shortUrl
                          ? import.meta.env.VITE_SHORT_URL_PREFIX + url.shortUrl
                          : ""}
                      </Box>
                      <Box>{url.fullUrl}</Box>
                    </TableCell>
                    <TableCell align="left">
                      <TimeTooltip timeString={url.creationDate} />
                    </TableCell>
                    <TableCell align="center" sx={{ width: 40 }}>
                      <MdContentCopy size={20} />
                    </TableCell>
                    <TableCell align="center" sx={{ width: 40 }}>
                      <IoQrCodeOutline size={20} />
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination />
        </>
      )}
    </Container>
  );
};

const TableToolbar = () => {
  const { pageSize, changePageSize, searchTerm, handelSearch } =
    useShortUrlContext();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 4 }}>
      <FormControl
        size="small"
        sx={{ alignItems: "center", flexDirection: "row" }}
      >
        <Typography sx={{ mr: 2 }}>Items per page</Typography>
        <Select
          value={pageSize}
          onChange={(e) => changePageSize(e.target.value)}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <TextField
        placeholder="Search"
        size="small"
        value={searchTerm}
        onChange={(e) => handelSearch(e.target.value)}
      />
    </Box>
  );
};

const Pagination = () => {
  const { totalHits, pageSize, page: activePage } = useShortUrlContext();
  const paginationPages = Math.ceil(totalHits / pageSize);
  const pagination =
    paginationPages > 1
      ? Array.from({ length: paginationPages }, (_, index) => index)
      : [];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 4,
      }}
    >
      <Typography>{totalHits} short URLs found</Typography>
      {!!pagination.length && (
        <Box sx={{ display: "flex" }}>
          {activePage !== 0 && (
            <PaginationItems page="prev">Previous</PaginationItems>
          )}
          {pagination.map((page) => (
            <PaginationItems key={page} page={page}>
              {page + 1}
            </PaginationItems>
          ))}
          {activePage < paginationPages - 1 && (
            <PaginationItems page="next">Next</PaginationItems>
          )}
        </Box>
      )}
    </Box>
  );
};

const PaginationItems: React.FC<{
  page: string | number;
  children: React.ReactNode;
}> = ({ page, children }) => {
  const { page: activePage, setPage } = useShortUrlContext();
  if (page === "prev") page = activePage - 1;
  if (page === "next") page = activePage + 1;

  return (
    <Typography
      sx={{
        py: 1,
        px: 2,
        bgcolor: page === activePage ? "primary.main" : "",
        cursor: "pointer",
      }}
      onClick={() => setPage(page)}
    >
      {children}
    </Typography>
  );
};

const TimeTooltip = ({ timeString }: { timeString: string }) => {
  const date = new Date(timeString);
  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Tooltip title={dateString} placement="top">
      <Typography display="inline" sx={{ cursor: "context-menu" }}>
        {createdAtFormatted(date)}
      </Typography>
    </Tooltip>
  );
};

function createdAtFormatted(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than a minute ago
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  // Less than an hour ago
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes === 1
      ? "About 1 minute ago"
      : `About ${diffInMinutes} minutes ago`;
  }

  // Less than a day ago
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours === 1
      ? "About 1 hour ago"
      : `About ${diffInHours} hours ago`;
  }

  // Less than a week ago
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return diffInDays === 1
      ? "About 1 day ago"
      : `About ${diffInDays} days ago`;
  }

  // Less than a month ago
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return diffInWeeks === 1
      ? "About 1 week ago"
      : `About ${diffInWeeks} weeks ago`;
  }

  // More than a month ago
  const diffInMonths = Math.floor(diffInWeeks / 4);
  if (diffInMonths >= 1) {
    return "More than a month ago";
  }
}
