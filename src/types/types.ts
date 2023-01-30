// вынести валюты в массив
const rates = [
  "AUD",
  "AZN",
  "GBP",
  "AMD",
  "BYN",
  "BGN",
  "BRL",
  "HUF",
  "VND",
  "HKD",
  "GEL",
  "DKK",
  "AED",
  "USD",
  "EUR",
  "EGP",
  "INR",
  "IDR",
  "KZT",
  "CAD",
  "QAR",
  "KGS",
  "CNY",
  "MDL",
  "NZD",
  "NOK",
  "PLN",
  "RON",
  "XDR",
  "SGD",
  "TJS",
  "THB",
  "TRY",
  "TMT",
  "UZS",
  "UAH",
  "CZK",
  "SEK",
  "CHF",
  "RSD",
  "ZAR",
  "KRW",
  "JPY",
] as const;

export interface ICurrencies {
  date: string;
  timestamp: string;
  base: string;
  rates: {
    [K in typeof rates[number]]: number;
  };
}
