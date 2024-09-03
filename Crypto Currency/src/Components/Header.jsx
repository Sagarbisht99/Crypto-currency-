import React from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useCrypto } from "../Contexts/CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bolder",
    cursor: "pointer",
    textDecoration: "none",
  },
  select: {
    width: 100,
    height: 40,
  },
}));

const Header = () => {
  const classes = useStyles();

  const { currency, setCurrency } = useCrypto();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Link to={"/"} className={classes.title}>
              <Typography variant="h5">Crypto Hunter</Typography>
            </Link>
            <Select
              onChange={(e) => setCurrency(e.target.value)}
              className={classes.select}
              defaultValue={currency}
              variant="outlined"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
