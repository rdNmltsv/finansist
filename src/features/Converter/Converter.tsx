import fx from "money";
import React, { FC, useEffect, useMemo, useState } from "react";
import styles from "./Converter.module.scss";

interface ConverterProps {
  currencies: string[];
}

const Converter: FC<ConverterProps> = ({ currencies }) => {
  const [value, setValue] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");

  useEffect(() => {
    setFromCurrency("RUB");
    setToCurrency("USD");
  }, []);

  const result = useMemo(() => {
    let res: number | null = null;

    if (value && fromCurrency && toCurrency) {
      res = fx(value).from(fromCurrency).to(toCurrency);
    }

    return res ? String(res.toFixed(3)) : "";
  }, [value, fromCurrency, toCurrency]);

  const handleChange = (value: string) => {
    const allDigitsOnly = new RegExp(/^\d*$/);
    if (allDigitsOnly.test(value)) {
      setValue(value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <label htmlFor="currency-amount">{"Конвертируемая сумма"}</label>
        <input
          name="currency-amount"
          min={0}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
        />

        <select
          name="convert-from"
          id="convert-from"
          value={fromCurrency}
          onChange={(event) => {
            setFromCurrency(event.target.value);
          }}
        >
          {currencies.map((currency) => (
            <option
              key={currency}
              value={currency}
              disabled={currency === toCurrency}
            >
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.arrow}>&rarr;</div>
      <div className={styles.wrapper}>
        <label htmlFor="currency-amount">{"Результат"}</label>
        <input readOnly name="currency-amount" value={result} />

        <select
          name="convert-to"
          id="convert-to"
          value={toCurrency}
          onChange={(event) => {
            setToCurrency(event.target.value);
          }}
        >
          {currencies.map((currency) => (
            <option
              key={currency}
              value={currency}
              disabled={currency === fromCurrency}
            >
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Converter;
