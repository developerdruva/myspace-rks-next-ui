"use client";
import { colorToRGBA, dateFormat } from "@/common/CommonFunction";
import SideScrolling from "@/components/scrolling/SideScrolling";
import { MdWork } from "react-icons/md";
import { useSelector } from "react-redux";
import ProjectCard from "../cards/ProjectCard";
import classes from "../styles/Experience.module.css";
import { Chip } from "@mui/material";

const Experience = () => {
  const portfolioDetails = useSelector((state) => state?.portfolioState);
  const themeModeFrmRdx = useSelector(
    (state) => state?.themeModeState?.themeMode
  );

  return (
    <div className={classes.box}>
      <span className={classes.head}>MY WORK EXPERIENCE</span>
      <div className={classes.timeline_centered}>
        {portfolioDetails?.workedCompanies?.map((comp, compIndex) => {
          return (
            <article className={`${classes.timeline_entry}`} key={compIndex}>
              <div
                className={`${classes.timeline_icon}`}
                style={{ backgroundColor: colorToRGBA(comp?.color_code, 0.4) }}
              >
                <MdWork
                  style={{
                    color: themeModeFrmRdx
                      ? colorToRGBA(comp.color_code, 1)
                      : "purple",
                  }}
                />
              </div>
              <div
                className={`${classes.mainCard}`}
                style={{
                  backgroundColor: themeModeFrmRdx ? "#f2f3f7" : "#1B2631",
                  color: themeModeFrmRdx ? "black" : "lightblue",
                }}
              >
                <div className={classes.mainCardHeader}>
                  <div className={classes.companyDetails}>
                    <div
                      style={{
                        color: themeModeFrmRdx ? comp.color_code : "steelblue",
                      }}
                    >
                      {comp?.company_name}{" "}
                    </div>
                    <div
                      style={{
                        color: themeModeFrmRdx ? comp.color_code : "steelblue",
                        backgroundColor: colorToRGBA(comp.color_code, 0.2),
                      }}
                      className=""
                    >
                      {comp?.designation}
                    </div>
                  </div>
                  <Chip
                    color={colorToRGBA(comp?.color_code, 0.2)}
                  >
                    {" "}
                    <span style={{ color: "black" }}>
                      {dateFormat(comp?.from_date, "MMM-YYYY") +
                        " to " +
                        dateFormat(comp?.to_date, "MMM-YYYY")}
                    </span>
                  </Chip>
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
