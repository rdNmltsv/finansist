import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICurrencies } from "../types/types";

export const ratesAPI = createApi({
  reducerPath: "ratesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.cbr-xml-daily.ru",
  }),
  endpoints: (build) => ({
    fetchRates: build.query<ICurrencies, void>({
      query: () => ({
        url: "/latest.js",
      }),
    }),
  }),
});
