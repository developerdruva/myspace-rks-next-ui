"use client";
import { colorToRGBA, dateFormat } from "@/common/CommonFunction";
import SideScrolling from "@/components/scrolling/SideScrolling";
import { useThemeMode } from "@/global/ThemeProvider";
import { Chip } from "@mui/material";
import { MdWork } from "react-icons/md";
import { useSelector } from "react-redux";
import ProjectCard from "../cards/ProjectCard";
import classes from "../styles/Experience.module.css";

const Experience = () => {
  const portfolioDetails = useSelector((state) => state?.portfolioState);

  const theme = useThemeMode();
  const isLight = theme.theme == "light" ? true : false;

  return (
    <div className={classes.box}>
      <span className={"headingForSection"}>MY WORK EXPERIENCE</span>
      <div className={classes.timeline_centered}>
        {portfolioDetails?.workedCompanies?.map((comp, compIndex) => {
          return (
            <article className={`${classes.timeline_entry}`} key={compIndex}>
              <div className={`${classes.timeline_icon}`}>
                <MdWork
                  style={{
                    color: isLight ? colorToRGBA(comp.color_code, 1) : "purple",
                  }}
                />
              </div>

              <div
                className={`${classes.mainCard}`}
                style={{
                  // backgroundColor: isLight ? "#f2f3f7" : "#1B2631",
                  color: isLight ? "black" : "lightblue",
                }}
              >
                <div className={classes.mainCardHeader}>
                  <div className={classes.companyDetails}>
                    <div
                      style={{
                        color: isLight ? comp.color_code : "steelblue",
                      }}
                    >
                      {comp?.company_name}{" "}
                    </div>
                    <div
                      style={{
                        color: isLight ? comp.color_code : "steelblue",
                        backgroundColor: colorToRGBA(comp.color_code, 0.2),
                      }}
                      className=""
                    >
                      {comp?.designation}
                    </div>
                  </div>
                  <Chip
                    variant="filled"
                    sx={{
                      backgroundColor: colorToRGBA(comp?.color_code, 0.2),
                      color: isLight ? comp?.color_code : "lightblue",
                    }}
                    label={
                      <span>
                        {" "}
                        {dateFormat(comp?.from_date, "MMM-YYYY") +
                          " to " +
                          dateFormat(comp?.to_date, "MMM-YYYY")}
                      </span>
                    }
                  />
                </div>

                <SideScrolling
                  data={portfolioDetails?.workedProjects
                    ?.filter(
                      (item) => item?.company_code === comp?.company_code
                    )
                    ?.map((item, index) => (
                      <ProjectCard
                        name={item?.project_name}
                        client={item?.client_name}
                        role={item?.role_name}
                        fromdate={`${item?.from_date} `}
                        todate={`${item?.to_date} `}
                        shortname={item?.project_shortname}
                        techstack={item?.tech_stack}
                        colorcode={comp?.color_code}
                        key={index}
                        isLight={isLight}
                      />
                    ))}
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
