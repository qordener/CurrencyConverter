import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { api } from './api';

export const ConversionContext = createContext({} as any);

export const ConversionContextProvider = ({ children }) => {
  const DEFAULT_BASE_CURRENCY = 'USD';
  const DEFAULT_QUOTE_CURRENCY = 'GBP';

  const [baseCurrency, _setBaseCurrency] = useState(DEFAULT_BASE_CURRENCY);
  const [quoteCurrency, setQuoteCurrency] = useState(DEFAULT_QUOTE_CURRENCY);
  const [date, setDate] = useState();
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const setBaseCurrency = (currency: string) => {
    setIsLoading(true);
    return api(`/latest?base=${currency}`)
      .then((res) => {
        console.log(res);
        _setBaseCurrency(currency);
        setDate(res.date);
        setRates(res.rates);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Sorry, something went wrong', error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const swapCurrencies = () => {
    setQuoteCurrency(baseCurrency);
    setBaseCurrency(quoteCurrency);
  };

  const contextValue = {
    baseCurrency,
    quoteCurrency,
    swapCurrencies,
    setBaseCurrency,
    setQuoteCurrency,
    date,
    rates,
    isLoading,
  };

  useEffect(() => {
    setBaseCurrency(DEFAULT_BASE_CURRENCY);
  }, []);

  return (
    <ConversionContext.Provider value={contextValue}>
      {children}
    </ConversionContext.Provider>
  );
};
