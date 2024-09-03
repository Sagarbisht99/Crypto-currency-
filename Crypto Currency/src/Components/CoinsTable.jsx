import React, { useEffect, useState } from "react";
import { useCrypto } from "../Contexts/CryptoContext";

import {
  Container,
  createTheme,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  Paper,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCryptoList } from "../Contexts/CryptoList";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    type: "dark",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "black",
          },
          "&.Mui-focused fieldset": {
            borderColor: "black",
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#EEBC1D",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "black",
          fontWeight: "bold",
        },
        body: {
          color: "white",
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        ul: {
          justifyContent: "center",
          padding: "0",
          marginTop: "20px",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "white",
          backgroundColor: "#333",
          "&:hover": {
            backgroundColor: "#555",
          },
        },
      },
    },
  },
});

const CoinsTable = () => {
  const { currency, symbol } = useCrypto();
  const { coinLists, loading , fetchingCryptoList } = useCryptoList();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  

 
  useEffect(() => {
    fetchingCryptoList(currency);
  }, [currency]);

  const handleSearch = () => {
    return coinLists.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedCoins = handleSearch().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center", paddingTop: 20 }}>
        <Typography
          variant="h4"
          style={{ marginBottom: 20, fontFamily: "Poppins", color: "#EEBC1D" }}
        >
          Cryptocurrencies Prices by Market Cap
        </Typography>
        <TextField
          style={{ marginBottom: 30, width: "100%", backgroundColor: "#333" }}
          variant="outlined"
          label="Search For a Cryptocurrency..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper} style={{ backgroundColor: "#222" }}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {["Coin", "Price", "24H Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                      style={{
                        backgroundColor: "#EEBC1D",
                        color: "black",
                        fontSize: 25,
                        fontWeight: "700",
                        fontFamily: "Poppins",
                        textAlign : "left" , 
                        padding: "30px 16px",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCoins.map((coin) => {
                  const profit = coin.price_change_percentage_24h >= 0;

                  return (
                    <TableRow
                      key={coin.id}
                      style={{
                        backgroundColor: "#333",
                        "&:hover": {
                          backgroundColor: "#444",
                        },
                      }}
                    >
                      <TableCell component="th" scope="row" style={{ display: "flex", alignItems: "center", padding: "12px 16px" }}>
                        <Link
                          to={`/coins/${coin.id}`}
                          style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}
                        >
                          <img
                            src={coin.image}
                            alt={coin.name}
                            height="50"
                            style={{ marginRight: 15 }}
                          />
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: 20, fontWeight: "700" }}>
                              {coin.symbol.toUpperCase()}
                            </span>
                            <span>{coin.name}</span>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, textAlign: "left", fontSize: 18, fontFamily: "Poppins", padding: "12px 16px" }}>
                        {`${symbol} ${coin.current_price.toLocaleString()}`}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: 18,
                          fontFamily: "Poppins",
                          textAlign: "left",
                          fontWeight: 600,
                          padding: "12px 16px",
                          color: profit ? "lightgreen" : "tomato",
                        }}
                      >
                        {profit
                          ? `+${coin.price_change_percentage_24h.toFixed(2)}%`
                          : `${coin.price_change_percentage_24h.toFixed(2)}%`}
                      </TableCell>
                      <TableCell style={{ textAlign: "left", fontWeight: 600, fontSize: 18, fontFamily: "Poppins", padding: "12px 16px" }}>
                        {`${symbol}${coin.market_cap.toLocaleString()}`}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={Math.ceil(handleSearch().length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          style={{ marginTop: 20, color: "white", backgroundColor: "#333", borderRadius: 4 }}
        />
      </Container>
    </ThemeProvider>
  );
};


export default CoinsTable;
