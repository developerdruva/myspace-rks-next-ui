"use client";
import classes from "@/components/styles/Skills.module.css";
import { useSelector } from "react-redux";
import EchartsBarWithBg from "../charts/EchartsBarWithBg";
import SkillsByCategoryView from "../cards/SkillsViewByCategory";

const Skills = () => {
  const portfolioDetails = useSelector((state) => state?.portfolioState);
  const skillSet = portfolioDetails?.skillSet;
  const skillSetKeys = portfolioDetails?.skillsKeys;
  const mySkills = portfolioDetails?.mySkills;
  const themeModeFrmRdx = useSelector(
    (state) => state?.themeModeState?.themeMode
  );
  const emailId = portfolioDetails?.personDetails[0]?.email_id;

  if (!portfolioDetails || !mySkills) {
    return <div className={classes.box}>Loading...</div>;
  }
  return (
    <div className={classes.box} id="skills">
      <h1 className={"headingForSection"}>MY SKILLS</h1>
      <EchartsBarWithBg
        xAxisValues={mySkills?.map((item) => item?.skill_name)}
        actualValues={mySkills?.map((item) => ({
          value: item?.skill_value,
          itemStyle: {
            color: item?.skill_style,
          },
        }))}
      />
      <SkillsByCategoryView emailId={emailId} />
    </div>
  );
};

export default Skills;

{
  /* <div className="row">
        {skillSetKeys?.map((skillKey, skillIndex) => (
          <div className="col-md-4   mt-5">
            <div
              className={`card text-secondary  ${classes.card1} ${""}`}
              style={{
                backgroundColor: themeModeFrmRdx ? "aliceblue" : "lightblue",
              }}
            >
              <div className="card-body">
                <h5
                  className="card-title text-primary fw-bold text-uppercase"
                  style={{ letterSpacing: "3px" }}
                >
                  {skillKey?.label_name.split(" ")[0]}
                </h5>
                <div className="row p-3 pt-0">
                  {skillSet?.map(
                    (item) =>
                      item[skillKey?.key_name?.trim()] != "-" && (
                        <div
                          className={classes.skillCardItem + " col-md-6 p-1"}
                        >
                          {item[skillKey?.key_name] && (
                            <>
                              <FaCode size={12} className="text-secondary" />
                              <span className="mx-2">
                                {item[skillKey?.key_name]}
                              </span>
                            </>
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */
}
