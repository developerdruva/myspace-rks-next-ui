import "./CSS/FooterPage.css";

// import { useSelector } from "react-redux";
import { BsGithub, BsLinkedin, BsCodeSlash, BsGit } from "react-icons/bs";
import { MdCode, MdEdit } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { Container } from "@mui/material";

const FooterPage = () => {
  // const themeMode = useSelector((state) => state.themeModeState.themeMode);

  return (
    <footer className={`footerWrapper `}>
      <Container maxWidth="xl">
        <div
          className="footerMainRow"
          // style={{ color: "aliceblue !important" }}
        >
          <div
            className="footerSection"
            style={{ color: "aliceblue !important" }}
          >
            <h5 className="footerTitle" align="left">
              About This Site
            </h5>
            <p className="footerText" align="justify">
              Designed & developed with React, Redux, Express and MongoDB. A
              personal portfolio to showcase experience, projects, and skills.
            </p>
          </div>
          <div className="footerSection">
            <h5 className="footerTitle" align="left">
              Quick Links
            </h5>
            <ul className="footerList">
              <li>
                <MdCode className="footerListIcon" /> My Projects
              </li>
              <li>
                <MdEdit className="footerListIcon" /> Tech Blog
              </li>
              <li>
                <RiProfileFill className="footerListIcon" /> Resume
              </li>
            </ul>
          </div>
          <div className="footerSection">
            <h5 className="footerTitle" align="left">
              Let's Connect
            </h5>
            <div className="footerIcons">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="footerIconLink"
              >
                <BsGithub />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="footerIconLink"
              >
                <BsLinkedin />
              </a>
              <a href="#code" className="footerIconLink">
                <BsCodeSlash />
              </a>
              <a href="#git" className="footerIconLink">
                <BsGit />
              </a>
            </div>
          </div>
        </div>
        <div className="footerBottomRow">
          <p className="footerCopyright">
            © {new Date().getFullYear()} Rajesh Kumar S. Built with ❤️ and clean
            code.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default FooterPage;
