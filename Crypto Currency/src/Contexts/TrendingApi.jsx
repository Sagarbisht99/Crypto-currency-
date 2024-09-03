import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { TrendingCoins } from '../config/api'
import axios from 'axios'



const TrendingContext = createContext({})


const TrendingApiContext = ({children}) => {

    const [trendingCoins, settrendingCoins] = useState([]);

    const fetchingTrendingCoins = async (currency) => {
         const {data} = await axios.get(TrendingCoins(currency))
         settrendingCoins(data);
    }

  return (
      <TrendingContext.Provider value={{trendingCoins , fetchingTrendingCoins }} >
        {children}
      </TrendingContext.Provider>
  )
}

export default TrendingApiContext;

export const useTrending = () => {
     return useContext(TrendingContext);
}