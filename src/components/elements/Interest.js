"use client";
import { useEffect } from "react";
import { BsFileEarmarkCode } from "react-icons/bs";
import { RiComputerLine } from "react-icons/ri";
import { SiCodesandbox } from "react-icons/si";
import "../styles/Interest.css";

const Interest = () => {
  useEffect(() => {}, []);
  return (
    <div id="interest">
      <span className={"headingForSection   "}>MY INTERESTS</span>
      <div className={"Interest "}>
        <div className={"web"}>
          <BsFileEarmarkCode style={{ fontSize: "10rem" }} />
          <h3>Coding</h3>
        </div>
        <div className={"app"}>
          <SiCodesandbox style={{ fontSize: "10rem" }} />
          <h3>Developing</h3>
        </div>
        <div className={"other"}>
          <RiComputerLine style={{ fontSize: "10rem" }} />
          <h3>Analyzing</h3>
        </div>
      </div>
    </div>
  );
};

export default Interest;
