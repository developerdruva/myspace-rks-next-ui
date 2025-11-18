"use client";
import { useEffect, useState } from "react";
import { Grid, Box, Button, Fade, useTheme } from "@mui/material";
import { MdDownload, MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";
import "../styles/HomePage.css";
import { useThemeMode } from "@/global/ThemeProvider";

const HomePage = () => {
  const personDetails = useSelector(
    (state) => state?.portfolioState?.personDetails?.[0]
  );
  const { theme, toggleTheme } = useThemeMode();
  const muiTheme = useTheme();

  const isLight = theme == "light" ? true : false;

  const [showScrollIcon, setShowScrollIcon] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIcon(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!personDetails) return null;

  return (
    <Box
      sx={{
        height: { xs: "auto", sm: "auto", md: "100vh" },
        minHeight: { xs: "100vh", sm: "100vh" },
        display: "grid",
        alignItems: "center",
        position: "relative",
        color: muiTheme.palette.text.primary,
      }}
    >
      <Grid container>
        <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 5, xl: 5 }}>
          <Box className=" personPhoto">
            <img
              src={personDetails.profile_pic || "/default-avatar.png"}
              alt="person"
            />
          </Box>
        </Grid>

        <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 7, xl: 7 }}>
          <Box sx={{ padding: { xs: 2, sm: 3, md: 5 } }}>
            <Box className="">
              <div
                className=" headerText"
                style={{ color: isLight ? "black" : "aliceblue" }}
              >
                I'm,
              </div>
            </Box>

            <Box
              className=" subHeadText"
              sx={{ color: muiTheme.palette.primary.main }}
            >
              <p>{personDetails.first_name}</p>
            </Box>

            <Box className="designationText">
              <TypeAnimation
                sequence={[personDetails.person_designation, 500]}
                speed={20}
                style={{
                  fontSize: "clamp(1rem, 2rem, 2.5rem)",
                  fontWeight: "lighter",
                }}
                repeat={Infinity}
                className={"typingtext"}
              />
            </Box>

            <Box paddingTop={2}>
              <Button
                variant="contained"
                color={isLight ? "warning" : "info"}
                size="small"
                onClick={() => window.open(personDetails.resume, "_blank")}
                startIcon={<MdDownload />}
              >
                Resume
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Fade in={showScrollIcon}>
        <Box
          className="scrollDownIcon"
          onClick={() =>
            document
              .getElementById("experience")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          sx={{ color: muiTheme.palette.primary.main }}
        >
          <MdKeyboardArrowDown size={38} />
        </Box>
      </Fade>
    </Box>
  );
};

export default HomePage;
