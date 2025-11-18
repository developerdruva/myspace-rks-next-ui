"use client";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/PocWorks.module.css";
import { useThemeMode } from "@/global/ThemeProvider";

const PocProjects = () => {
  const portfolioDetails = useSelector((state) => state?.portfolioState);
  const pocProjects = portfolioDetails?.pocProjects;
  const usedTechsOfPoc = portfolioDetails?.usedTechsOfPoc;
  const theme = useThemeMode();
  const isLight = theme.theme == "light" ? true : false;

  return (
    <Fragment>
      <div className={styles.box} id="works">
        <span className={"headingForSection"}>MY POC PROJECT WORKS </span>
        <Grid container spacing={2}>
          {pocProjects?.map((pocItem, pocIndex) => (
            <Grid
              item
              size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
              key={pocItem?.title + "-" + pocIndex}
            >
              <Card
                sx={{ backgroundColor: isLight ? "white" : "#121212" }}
                key={pocItem?.title + "-" + pocIndex}
              >
                <CardContent className={styles.cardimg}>
                  <img
                    src={pocItem?.img_url}
                    alt="Card cap"
                    onClick={() => window?.open(pocItem?.project_url, "_blank")}
                  />
                </CardContent>

                <CardHeader
                  sx={{ justifyContent: "center" }}
                  title={
                    <p style={{ fontSize: "0.8rem", textAlign: "center" }}>
                      {pocItem?.title}{" "}
                      <span style={{ fontSize: "0.65rem" }}>
                        ({pocItem?.project_type})
                      </span>
                    </p>
                  }
                />
                <CardActions>
                  <div className="">
                    <p
                      className="m-0 p-0 lead fs-6 text-decoration-underline"
                      align="justify"
                    >
                      Technologies Used
                    </p>
                    <div className={`${styles.techsDiv} m-0 p-0`}>
                      <p align="justify" className="m-0 lead fs-6 fw-bold">
                        Design:
                      </p>
                      <p align="justify" className="m-0 mb-1">
                        {usedTechsOfPoc
                          ?.filter((item) => item?.poc_name === pocItem?.title)
                          ?.filter((item) => item?.tech_for === "Design")
                          .map((item, index) => (
                            <span key={`design-${pocIndex}-${index}`}>
                              {item?.tech_name},&nbsp;
                            </span>
                          ))}
                      </p>
                      <p align="justify" className="m-0 lead fs-6 fw-bold">
                        Development:
                      </p>
                      <p align="justify" className="m-0 mb-1">
                        {usedTechsOfPoc
                          ?.filter((item) => item?.poc_name === pocItem?.title)
                          ?.filter((item) => item?.tech_for === "Develope")
                          .map((item, index) => (
                            <span key={`dev-${pocIndex}-${index}`}>
                              {item?.tech_name},&nbsp;
                            </span>
                          ))}
                      </p>
                      <p align="justify" className="m-0 lead fs-6 fw-bold">
                        Database:
                      </p>
                      <p align="justify" className="m-0 mb-1">
                        {usedTechsOfPoc
                          ?.filter((item) => item?.poc_name === pocItem?.title)
                          ?.filter((item) => item?.tech_for === "Database")
                          .map((item, index) => (
                            <span key={`db-${pocIndex}-${index}`}>
                              {item?.tech_name},&nbsp;
                            </span>
                          ))}
                      </p>
                      <p align="justify" className="m-0 lead fs-6 fw-bold">
                        Tools & Frameworks:
                      </p>
                      <p align="justify" className="m-0 mb-1">
                        {usedTechsOfPoc
                          ?.filter((item) => item?.poc_name === pocItem?.title)
                          ?.filter(
                            (item) => item?.tech_for === "Tools & Frameworks"
                          )
                          .map((item, index) => (
                            <span key={`tools-${pocIndex}-${index}`}>
                              {item?.tech_name},&nbsp;
                            </span>
                          ))}
                      </p>
                      <p align="justify" className="m-0 lead fs-6 fw-bold">
                        Deploy & Cloud:
                      </p>
                      <p align="justify" className="m-0 mb-1">
                        {usedTechsOfPoc
                          ?.filter((item) => item?.poc_name === pocItem?.title)
                          ?.filter(
                            (item) => item?.tech_for === "Deploy & Cloud:"
                          )
                          .map((item, index) => (
                            <span key={`cloud-${pocIndex}-${index}`}>
                              {item?.tech_name},&nbsp;
                            </span>
                          ))}
                      </p>
                    </div>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Fragment>
  );
};

export default PocProjects;

{
  /**

<div className="col-md-4">
                        <div className={`card text-secondary border-0`}>
                            <div className={`card-body ${styles.cardimg}`}>
                                <img className={`card-img-top `} src={streamlineimg} alt="Card cap"></img>
                                <div className={`card-img-overlay ${styles.hide} `}>
                                    <button className='btn btn-info btn-sm' ><a href='https://streamlineott.netlify.app' className='text-light' target='_blank' rel="noopener noreferrer">View</a></button>
                                </div>
                            </div>
                            <div className='card-heading'>
                                <p className='text-info text-center'>STREAMLINE (OTT)</p>
                            </div>
                        </div>
                        <div className={`card-text ${styles.techs}`}>
                            <ul>
                                <li style={{ fontSize: '11px', color: 'blueviolet' }}>Design:</li>
                                <li>HTML5 &amp; CSS3</li>
                                <li>Bootstrap 5.0</li>
                                <li>React Bootstrap</li>
                            </ul>
                            <ul>
                                <li style={{ fontSize: '11px', color: 'blueviolet' }}>Develope:</li>
                                <li>JavaScript</li>
                                <li>ES6</li>
                                <li>React JS</li>
                                <li>Node JS</li>
                                <ul>
                                    <li style={{ fontSize: '11px', color: 'blueviolet' }}>Tools &amp; Frameworks:</li>
                                    <li>Express</li>
                                    <li>Mongoose</li>
                                    <li>Redux</li>
                                    <li>npm</li>
                                    <li>webpack</li>
                                </ul>
                            </ul>
                            <ul>
                                <li style={{ fontSize: '11px', color: 'blueviolet' }}>Database:</li>
                                <li>MongoDB</li>
                                <li>MongoDB Atlas</li>
                                <li>Mongoose ORM</li>
                                <li></li>
                            </ul>
                            <ul>
                                <li style={{ fontSize: '11px', color: 'blueviolet' }}>Deploy &amp; Cloud:</li>
                                <li>AWS S3</li>
                                <li>Netlify</li>
                                <li>Heroku</li>
                                <li>AWS EC2</li>
                                <li>AWS Codepipeline</li>
                                <li>AWS Elastick Beanstalk</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={`card text-secondary border-0`}>
                            <div className={`card-body ${styles.cardimg}`}>
                                <img className={`card-img-top `} src={myspaceimg} alt="Card cap"></img>
                                <div className={`card-img-overlay ${styles.hide} `}>
                                    <button className='btn btn-info btn-sm' ><a href='#home' className='text-light' target='_blank' >View</a></button>
                                </div>
                            </div>
                            <div className='card-heading'>
                                <p className='text-info text-center'>MYSPACE (BLOG)</p>
                            </div>
                        </div>
                        <div className={`card-text ${styles.techs}`}>
                            <ul>
                                <li style={{ fontSize: '11px', color: 'blueviolet' }}>Design:</li>
                                <li>HTML5 &amp; CSS3</li>
                                <li>Bootstrap 5.0</li>
                                <li>React Bootstrap</li>
                            </ul>
                            <ul>
                                <li style={{ fontSize: '11px', color: 'blueviolet' }}>Develope:</li>
                                <li>JavaScript</li>
                                <li>ES6</li>
                                <li>React JS</li>
                                <li>Node JS</li>
                                <ul>
                                    <li style={{ fontSize: '11px', color: 'blueviolet' }}>Tools &amp; Frameworks:</li>
                                    <li>npm</li>
                                    <li>webpack</li>
                                </ul>
                            </ul>
                            <ul>
                                <li style={{ fontSize: '11px', color: 'blueviolet' }}>Deploy &amp; Cloud:</li>
                                <li>Netlify</li>
                            </ul>
                        </div>
                    </div>

*/
}
