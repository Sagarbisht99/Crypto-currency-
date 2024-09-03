import React, { useEffect, useState } from "react";
import { useCrypto } from "../Contexts/CryptoContext";
import { SingleCoin } from "../config/api";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Container, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const Sidebar = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 600,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
  borderRadius: 8,
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  [theme.breakpoints.down("md")]: {
    padding: 10,
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontFamily: "Poppins, sans-serif",
  marginBottom: 20,
  textAlign: "center",
}));

const Description = styled(Typography)(({ theme }) => ({
  width: "100%",
  fontFamily: "Poppins, sans-serif",
  padding: "0 20px",
  paddingBottom: 15,
  textAlign: "justify",
  marginBottom: 20,
}));

const MarketData = styled(Box)(({ theme }) => ({
  width: "100%",
  textAlign: "center",
}));

const Img = styled("img")(({ theme }) => ({
  marginBottom: 20,
  borderRadius: 8,
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = useCrypto();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch coin data
  const fetchingCoin = async () => {
    try {
      const response = await fetch(SingleCoin(id));
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const coinInfo = await response.json();
      setCoin(coinInfo);
    } catch (error) {
      console.error("Error fetching coin data:", error);
      setError("Failed to fetch coin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingCoin();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" padding="20px">
          <CircularProgress style={{ color: "gold" }} size={100} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" padding="20px">
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box display="flex" justifyContent="center" padding="20px">
        <Sidebar>
          <Img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
          />
          <Heading style={{ fontFamily : "Poppins" , color : "black"}} variant="h4">
            {coin?.name}
          </Heading>
          <Description style={{ fontFamily : "Poppins" , color : "black"}} >
            {coin?.description.en.split(". ")[0]}
          </Description>
          <MarketData>
            <Typography variant="h5" style={{ fontFamily : "Poppins" ,  fontWeight: 700 , color : "black" }}>
              Rank: {coin?.market_cap_rank}
            </Typography>
            <Typography variant="h5" style={{ fontFamily : "Poppins" , fontWeight: 700 , color : "black" }}>
              Current Price: {symbol} {coin?.market_data.current_price[currency.toLowerCase()]}
            </Typography>
            <Typography variant="h5" style={{ fontFamily : "Poppins" , fontWeight: 700 , color : "black" }}>
              Market Cap: {symbol} {coin?.market_data.market_cap[currency.toLowerCase()]}
            </Typography>
          </MarketData>
        </Sidebar>
      </Box>
    </Container>
  );
};

export default CoinPage;
