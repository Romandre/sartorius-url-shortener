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
