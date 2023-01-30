import React, { FC, useState, useEffect } from "react";
import Converter from "./features/Converter/Converter";
import { ratesAPI } from "./services/CurrencyService";
import styles from "./App.module.scss";
import fx from "money";
import Table from "./features/Table/Table";
import Loader from "./components/Loader/Loader";

const App: FC = () => {
  const { data, isLoading, isError } = ratesAPI.useFetchRatesQuery();
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    fx.base = data?.base ?? "";
    fx.rates = { ...data?.rates, [fx.base]: 1 } ?? {};
    setCurrencies([...Object.keys(fx.rates)]);
  }, [data]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Error</div>
      ) : (
        <>
          <Converter currencies={currencies} />
          <Table currencies={currencies} />
        </>
      )}
    </div>
  );
};

export default App;
