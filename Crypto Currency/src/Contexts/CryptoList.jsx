import React, { useState } from "react";
import { createContext, useContext } from "react";
import { CoinList } from "../config/api";
import axios from "axios"

const CryptoList = createContext({});

const CryptoListContext = ({ children }) => {
  const [coinLists, setcoinLists] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchingCryptoList = async (currency) => {
    setloading(true);   
    const {data} = await axios.get(CoinList(currency));
    setcoinLists(data);
    setloading(false);
  };

  return <CryptoList.Provider value={{coinLists, loading ,  fetchingCryptoList}} >{children}</CryptoList.Provider>;
};

export default CryptoListContext;

export const useCryptoList = () => {
  return useContext(CryptoList);
};
