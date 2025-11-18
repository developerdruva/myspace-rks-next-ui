"use client";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import styles from "../styles/Education.module.css";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { useThemeMode } from "@/global/ThemeProvider";

const Education = () => {
  const portfolioDetails = useSelector((state) => state?.portfolioState);
  const educationDetails = portfolioDetails?.myStudies;
  const theme = useThemeMode();
  const isLight = theme.theme == "light" ? true : false;

  return (
    <div
      className={styles.box}
      id="education"
      style={{
        backgroundColor: isLight ? "white" : "inherit",
        overflow: "hidden",
      }}
    >
      <span className={"headingForSection"}>EDUCATION</span>
      <div className={"mt-3"}>
        {educationDetails?.map((eduItem, eduIndex) => (
          <Accordion
            key={eduIndex}
            style={{
              backgroundColor: isLight ? "white" : "inherit",
              overflow: "hidden",
            }}
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<span>▼</span>}
              sx={{ fontSize: "1.2rem" }}
            >
              {eduItem?.study}
            </AccordionSummary>
            <AccordionDetails style={{ color: isLight ? "#444" : "steelblue" }}>
              {parse(eduItem?.study_desc)}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Education;
