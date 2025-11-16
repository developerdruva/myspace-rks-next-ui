"use client";
import classes from "../styles/About.module.css";
import {Typography,  Box, useTheme, useMediaQuery } from "@mui/material";

import { useSelector } from "react-redux";

const Aboutme = () => {
  const portfolioDetails = useSelector((state) => state?.portfolioState);
  const personDetails = portfolioDetails?.personDetails[0];
  const educationDetails = portfolioDetails?.myStudies;
  const eduCount = Math.max(
    ...educationDetails.map((edu) => parseInt(edu?.study_seq))
  );
  const highestQualification =
    educationDetails?.find((edu) => edu?.study_seq == eduCount) || {};
  const mostUsedSkills = portfolioDetails?.mySkills?.filter(
    (skill) => parseInt(skill?.skill_value) >= 80
  );
  const currentCompany = portfolioDetails?.workedCompanies?.sort(
    (a, b) => parseInt(b?.company_seq) - parseInt(a?.company_seq)
  )[0];
  const themeModeFrmRdx = useSelector(
    (state) => state?.themeModeState?.themeMode
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const textColor = themeModeFrmRdx ? "black" : "aliceblue";
  return (
    <Box
      id="about"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: textColor,
        // px: { xs: 2, md: 6 },
        py: { xs: 4, md: 6 },
        // borderRadius: 2,
        // boxShadow: 3,
        maxWidth: "auto",
        margin: "auto",
        mt: 6,
      }}
    >
      {/* {JSON.stringify(currentCompany)} */}
      <Typography
        className={classes.head}
        sx={{
          fontWeight: 700,
          color: theme.palette.primary.main,
          textAlign: isMobile ? "center" : "left",
          mb: 1,
          letterSpacing: 2,
        }}
      >
        ABOUT ME
      </Typography>

      <Box sx={{ mt: 2 }}>
        <div
          style={{
            // background: "#f9f9f9",
            padding: "24px",
            borderRadius: "12px",
          }}
        >
          <div style={{ fontSize: "16px", lineHeight: 1.8 }}>
            Hi there! I am{" "}
            <span style={{ color: "#1677ff", fontWeight: 600 }}>
              {personDetails?.first_name} {personDetails?.last_name}
            </span>
            , currently working as a{" "}
            <span style={{ fontWeight: 600 }}>
              {currentCompany?.designation}
            </span>{" "}
            at{" "}
            <span style={{ fontWeight: 600 }}>
              {currentCompany?.company_name}
            </span>
            .
            <br />I graduated with a{" "}
            <span style={{ fontWeight: 600 }}>
              {highestQualification?.study}
            </span>{" "}
            in{" "}
            <span style={{ fontWeight: 600 }}>
              {highestQualification?.stream}
            </span>{" "}
            from{" "}
            <span style={{ fontWeight: 600 }}>
              {highestQualification?.study_intitute}
            </span>
            , {highestQualification?.university},{" "}
            {highestQualification?.study_location}.
          </div>

          <div style={{ fontSize: "16px", lineHeight: 1.8 }}>
            I’m passionate about continuous learning, exploring new
            technologies, and solving real-world problems through code. I enjoy
            working with diverse tech stacks and have hands-on experience with
            tools and languages like{" "}
            {mostUsedSkills?.map((skill, index) => (
              <span key={skill?.skill_name} style={{ fontWeight: 600 }}>
                {skill?.skill_name}
                {index < mostUsedSkills.length - 2
                  ? ", "
                  : index === mostUsedSkills.length - 2
                  ? " and "
                  : ""}
              </span>
            ))}
            .
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Aboutme;
