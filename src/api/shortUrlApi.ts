import axios from "axios";
import {
  ShortUrl,
  ShortUrlSearchRequest,
  ShortUrlCreationRequest,
  ShortUrlSearchResponse,
} from "../types";

const BASE_URL =
  "https://app-prod-sag-wcms-interview-weu-001.azurewebsites.net/api/short-url";

export const shortUrlApi = {
  searchUrls: async (
    params: ShortUrlSearchRequest
  ): Promise<ShortUrlSearchResponse> => {
    const response = await axios.post(`${BASE_URL}/find`, params);
    return response.data;
  },

  createShortUrl: async (data: ShortUrlCreationRequest): Promise<ShortUrl> => {
    const response = await axios.post(`${BASE_URL}/create`, data);
    return response.data;
  },
};
