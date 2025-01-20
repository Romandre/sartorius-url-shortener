import { AlertColor } from "@mui/material";

export interface ShortUrl {
  shortUrl: string;
  fullUrl: string;
  creationDate: string;
}

export interface ShortUrlSearchResponse {
  hits: ShortUrl[];
  totalHits: number;
}

export interface ShortUrlSearchRequest {
  term?: string;
  pageNumber: number;
  pageSize: number;
}

export interface ShortUrlCreationRequest {
  shortUrl: string;
  fullUrl: string;
}

export interface ShortUrlContextType {
  urls: ShortUrl[];
  totalHits: number;
  searchTerm: string;
  page: number;
  pageSize: number;
  isLoading: boolean;
  error: Error | null;
  isCreating: boolean;
  createError: Error | null;
  alert: Alert;
  handelSearch: (term: string) => void;
  setPage: (page: number) => void;
  changePageSize: (size: number) => void;
  createShortUrl: (data: ShortUrlCreationRequest) => Promise<void>;
  pushAlert: (message: string, type: AlertColor) => void;
  resetAlert: () => void;
}

export interface Alert {
  isOpen: boolean;
  message: string;
  type?: AlertColor;
}
