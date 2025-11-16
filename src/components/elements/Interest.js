"use client";
import { useEffect } from "react";
import { BsFileEarmarkCode } from "react-icons/bs";
import { RiComputerLine } from "react-icons/ri";
import { SiCodesandbox } from "react-icons/si";
import "../styles/Interest.css";

const Interest = () => {
  useEffect(() => {}, []);
  return (
    <div className={"box mt-4 mb-4 mb-5"} id="interest">
      <span className={"head mt-4   "}>MY INTERESTS</span>
      <div className={"Interest m-0"}>
        <div className={"web"}>
          <BsFileEarmarkCode
            style={{ fontSize: "10rem" }}
            className="text-primary"
          />
          <h3>Coding</h3>
        </div>
        <div className={"app"}>
          <SiCodesandbox
            style={{ fontSize: "10rem" }}
            className="text-warning"
          />
          <h3>Developing</h3>
        </div>
        <div className={"other"}>
          <RiComputerLine style={{ fontSize: "10rem" }} className="text-info" />
          <h3>Analyzing</h3>
        </div>
      </div>
    </div>
  );
};

export default Interest;
