import fx from "money";
import { FC, useEffect, useMemo, useState } from "react";
import styles from "./Table.module.scss";

enum SortValue {
  DEFAULT,
  CURRENCY = "currency",
  RATE = "rate",
}

enum SortDirection {
  ASCENDING,
  DESCENDING,
}

interface TableProps {
  currencies: string[];
}

const Table: FC<TableProps> = ({ currencies }) => {
  const [baseCurrency, setBaseCurrency] = useState<string>("");
  const [sortMode, setSortMode] = useState<SortValue>(SortValue.DEFAULT);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASCENDING
  );

  const rates = useMemo(() => {
    if (!baseCurrency || currencies.length === 0) {
      return [];
    }

    const res = currencies.map((currency) => ({
      currency,
      rate: fx(1).from(baseCurrency).to(currency),
    }));
    return res;
  }, [baseCurrency, currencies]);

  const sortedRates = useMemo(() => {
    if (sortMode === SortValue.DEFAULT) {
      return rates;
    }

    return [...rates].sort((a, b) => {
      let result: number;

      if (sortMode === SortValue.CURRENCY) {
        result = a[sortMode].localeCompare(b[sortMode]);
      } else {
        result = a[sortMode] - b[sortMode];
      }

      return sortDirection === SortDirection.ASCENDING ? result : -result;
    });
  }, [rates, sortMode, sortDirection]);

  useEffect(() => {
    setBaseCurrency("RUB");
  }, []);

  const handleClickRate = () => {
    setSortMode(SortValue.RATE);
    invertSortDirection();
  };

  const handleClickCurrency = () => {
    setSortMode(SortValue.CURRENCY);
    invertSortDirection();
  };

  const invertSortDirection = () => {
    setSortDirection((prev) =>
      prev === SortDirection.ASCENDING
        ? SortDirection.DESCENDING
        : SortDirection.ASCENDING
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.labeledSelect}>
          <label htmlFor="base-currency">{"Базовая валюта"}</label>
          <select
            name="base-currency"
            id="base-currency"
            value={baseCurrency}
            onChange={(event) => {
              setBaseCurrency(event.target.value);
            }}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th onClick={handleClickCurrency}>
                Валюта{" "}
                {sortMode === SortValue.CURRENCY &&
                  (sortDirection === SortDirection.DESCENDING ? (
                    <>&uarr;</>
                  ) : (
                    <>&darr;</>
                  ))}
              </th>
              <th onClick={handleClickRate}>
                Курс
                {sortMode === SortValue.RATE &&
                  (sortDirection === SortDirection.DESCENDING ? (
                    <>&uarr;</>
                  ) : (
                    <>&darr;</>
                  ))}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRates.map(({ currency, rate }) =>
              currency === baseCurrency ? null : (
                <tr key={currency}>
                  <td
                    className={styles.currencyCell}
                    onClick={() => setBaseCurrency(currency)}
                  >
                    {currency}
                  </td>
                  <td>{rate.toFixed(3)}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
