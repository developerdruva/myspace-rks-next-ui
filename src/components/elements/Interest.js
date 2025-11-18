"use client";
import { useEffect } from "react";
import { BsFileEarmarkCode } from "react-icons/bs";
import { RiComputerLine } from "react-icons/ri";
import { SiCodesandbox } from "react-icons/si";
import "../styles/Interest.css";
import { Grid } from "@mui/material";

const Interest = () => {
  useEffect(() => {}, []);
  return (
    <div id="interest" style={{ padding: "1rem 0rem 10rem 0rem" }}>
      <span className={"headingForSection   "}>MY INTERESTS</span>
      <Grid container spacing={4} className={"Interest "}>
        <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} className={"web"}>
          <BsFileEarmarkCode style={{ fontSize: "10rem" }} />
          <h3>Coding</h3>
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} className={"app"}>
          <SiCodesandbox style={{ fontSize: "10rem" }} />
          <h3>Developing</h3>
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} className={"other"}>
          <RiComputerLine style={{ fontSize: "10rem" }} />
          <h3>Analyzing</h3>
        </Grid>
      </Grid>
    </div>
  );
};

export default Interest;
