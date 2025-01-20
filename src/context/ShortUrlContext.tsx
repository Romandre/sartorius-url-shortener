import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { shortUrlApi } from "../api/shortUrlApi";
import {
  ShortUrl,
  ShortUrlCreationRequest,
  ShortUrlSearchResponse,
} from "../types";

interface Alert {
  isOpen: boolean;
  message: string;
  type?: string;
}

interface ShortUrlContextType {
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
  pushAlert: (message: string, type: string) => void;
  resetAlert: () => void;
}

const ShortUrlContext = createContext<ShortUrlContextType | null>(null);

export const ShortUrlProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [alert, setAlert] = useState<Alert>({ isOpen: false, message: "" });

  const { data, isLoading, error } = useQuery<ShortUrlSearchResponse, Error>({
    queryKey: ["shortUrls", { searchTerm, page, pageSize }],
    queryFn: () =>
      shortUrlApi.searchUrls({
        term: searchTerm,
        pageNumber: page,
        pageSize,
      }),
  });

  const {
    mutateAsync: createShortUrlMutation,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: shortUrlApi.createShortUrl,
    onSuccess: () => {
      setAlert({ isOpen: true, message: "Short URL was created!" });
      queryClient.invalidateQueries({ queryKey: ["shortUrls"] });
    },
    onError: () => {
      setAlert({ isOpen: true, message: "Short URL couldn't be created" });
    },
  });

  const createShortUrl = async (data: ShortUrlCreationRequest) => {
    await createShortUrlMutation(data);
  };

  const changePageSize = (size: number) => {
    setPage(0);
    setPageSize(size);
  };

  const handelSearch = (term: string) => {
    setPage(0);
    setSearchTerm(term);
  };

  const pushAlert = (message: string, type?: string) => {
    setAlert({ isOpen: true, message, type });
  };

  const resetAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  const value = {
    urls: data?.hits || [],
    totalHits: data?.totalHits || 0,
    searchTerm,
    page,
    pageSize,
    isLoading,
    error,
    isCreating,
    createError,
    alert,
    handelSearch,
    setPage,
    changePageSize,
    createShortUrl,
    pushAlert,
    resetAlert,
  };

  return (
    <ShortUrlContext.Provider value={value}>
      {children}
    </ShortUrlContext.Provider>
  );
};

export const useShortUrlContext = () => {
  const context = useContext(ShortUrlContext);
  if (context === undefined) {
    throw new Error("useShortUrl must be used within a ShortUrlProvider");
  }
  return context;
};
