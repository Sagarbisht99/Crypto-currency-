import React from "react";
import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import banner from "/src/Assets/banner.jpg";
import Carousel from "./Carousel";

const useStyle = makeStyles(() => ({
  banner: {
    backgroundImage: `url(${banner})`,
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column", 
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyle();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Poppins",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Poppins",
            }}
          >
            Get all the Info regarding your Faviourate crypto currency
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  );
};

export default Banner;
