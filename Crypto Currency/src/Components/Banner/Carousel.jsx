import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { useCrypto } from "../../Contexts/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { useTrending } from "../../Contexts/TrendingApi";


const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
  coinImage: {
    marginBottom: 10,
  },
  coinName: {
    fontSize: 16,
    fontWeight: 500,
  },
  price: {
    fontSize: 22,
    fontWeight: 500,
  },
  profit: {
    color: "green",
  },
  loss: {
    color: "red",
  },
}));

const Carousel = () => {

  const { trendingCoins , fetchingTrendingCoins } = useTrending();

  const { currency, symbol } = useCrypto();
  const classes = useStyles();

      

  useEffect(() => {
    fetchingTrendingCoins(currency);
  }, [currency]);

  const formatCurrency = (amount) => {
    return (
      symbol +
      amount
        .toFixed(2)
        .replace(/\B(?=(\d{2})+(?!\d))/g, ",")
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
    );
  };

  const items = trendingCoins.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <div className={classes.carouselItem} key={coin.id}>
        <Link to={`/coins/${coin.id}`}>
          <img
            src={coin?.image}
            alt={coin?.name}
            height="80"
            className={classes.coinImage}
          />
        </Link>
        <div>
          <span className={classes.coinName}>{coin.name}</span>
          <span className={profit ? classes.profit : classes.loss}>
            {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
        <span className={classes.price}>
          {formatCurrency(coin.current_price)}
        </span>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        disableButtonsControls
        autoPlay
        autoPlayInterval={3000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        items={items}
      />
    </div>
  );
};

export default Carousel;
