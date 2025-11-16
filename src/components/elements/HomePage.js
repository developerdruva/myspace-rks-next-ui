"use client";
import { useEffect, useState } from "react";
import { Grid, Box, Button, Fade, useTheme } from "@mui/material";
import { MdDownload, MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";
import "../styles/HomePage.css";

const HomePage = () => {
  const theme = useTheme();
  const portfolioDetails = useSelector((state) => state?.portfolioState);
  const personDetails = portfolioDetails?.personDetails[0];
  const [showScrollIcon, setShowScrollIcon] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIcon(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        height: "90vh",
        display: "grid",
        alignItems: "center",
        position: "relative",
        color: theme.palette.text.primary,
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={5} xl={5} xxl={5}>
          <Box
            className="d-flex justify-content-center personPhoto"
            sx={{ width: "100%", height: "100%" }}
          >
            <img
              src={personDetails?.profile_pic}
              alt="personPhoto"
              style={{
                display: "block",
                alignSelf: "center",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={7} xl={7} xxl={7}>
          <Box>
            <Box className="d-flex justify-content-start">
              <div className="display-6 headerText">
                I'm, <span className="fw-bold"></span>
              </div>
            </Box>
            <Box className="d-flex justify-content-start">
              <div
                className="subHeadText"
                style={{ color: theme.palette.primary.main }}
              >
                <h1>{personDetails?.first_name}</h1>
              </div>
            </Box>

            <Box className="d-flex designationText">
              <TypeAnimation
                sequence={[`${personDetails?.person_designation}`, 500]}
                speed={20}
                style={{
                  fontSize: "2rem",
                  fontWeight: "lighter",
                  color: theme.palette.text.primary + " !important",
                }}
                repeat={Infinity}
              />
            </Box>

            <Box className="d-flex m-0 mt-2">
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() => window.open(personDetails?.resume, "_blank")}
                startIcon={<MdDownload className="me-2" />}
                className="btn btn-warning btn-sm"
              >
                Resume
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Floating Scroll Icon */}
      <Fade in={showScrollIcon}>
        <Box
          className="scrollDownIcon"
          onClick={() => {
            document
              .getElementById("experience")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{ color: theme.palette.primary.main }}
        >
          <MdKeyboardArrowDown size={38} />
        </Box>
      </Fade>
    </Box>
  );
};

export default HomePage;
