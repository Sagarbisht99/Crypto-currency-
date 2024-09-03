import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';

// Create the context
const TrendingContext = createContext({});

// Define cache and expiration time
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

const TrendingApiContext = ({ children }) => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [lastFetch, setLastFetch] = useState(0);

  // Function to fetch trending coins
  const fetchingTrendingCoins = async (currency) => {
    const now = Date.now();
    
    // Check if data is cached and not expired
    if (now - lastFetch < CACHE_EXPIRY && localStorage.getItem('trendingCoins')) {
      const cachedData = JSON.parse(localStorage.getItem('trendingCoins'));
      setTrendingCoins(cachedData);
      return;
    }

    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrendingCoins(data);
      localStorage.setItem('trendingCoins', JSON.stringify(data)); // Cache the data
      setLastFetch(now); // Update the last fetch time
    } catch (error) {
      console.error('Error fetching trending coins:', error);
      if (error.response && error.response.status === 429) {
        console.error('Rate limit exceeded. Try again later.');
      }
    }
  };

  // Use effect to fetch trending coins on mount
  useEffect(() => {
    fetchingTrendingCoins('usd'); // Replace 'usd' with your default currency
  }, []);

  return (
    <TrendingContext.Provider value={{ trendingCoins, fetchingTrendingCoins }}>
      {children}
    </TrendingContext.Provider>
  );
};

export default TrendingApiContext;

export const useTrending = () => {
  return useContext(TrendingContext);
};
