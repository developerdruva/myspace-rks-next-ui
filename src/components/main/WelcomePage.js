"use client";
import { useRef, useState } from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import LoadingSpinner from "../common/commonComps/LoadingSpinner";
import Aboutme from "../elements/Aboutme";
import Certify from "../elements/Certify";
import Education from "../elements/Education";
import Experience from "../elements/Experience";
import HomePage from "../elements/HomePage";
import Interest from "../elements/Interest";
import PocProjects from "../elements/PocProjects";
import Skills from "../elements/Skills";
import NavbarHeader from "../main/NavbarHeader";
import "./CSS/WelcomeStyles.css";
import { navbarItemsUtils, scrollFunction } from "./NavUtils";

const WelcomePage = ({}) => {
  const portfolioDetails =
    useSelector((state) => state?.portfolioState) || null;
  const themeMode = useSelector((state) => state.themeModeState.themeMode);
  const [isShow, setIsShow] = useState(false);
  const [feedBack, setFeedBack] = useState({
    like: false,
    unlike: false,
    feedbackDesc: "",
  });

  const [activeSection, setActiveSection] = useState("");
  const sections = useRef([]);

  return (
    <div
      data-bs-spy="scroll"
      data-bs-target="#navbarstyled"
      data-bs-offset="0"
      tabIndex="0"
    >
      <NavbarHeader
        navbarItems={navbarItemsUtils}
        logoTitle={"PERSONAL BLOG"}
        scrollFunction={scrollFunction}
        themeMode={themeMode}
      />

      <div
        style={{
          backgroundColor: themeMode === "light" ? "white" : "black",
          overflow: "hidden",
        }}
      >
        <Container>
          {portfolioDetails?.personDetails[0]?.welcome_text && (
            <div className="m-0 p-0 welcometext">
              <span>{portfolioDetails?.personDetails[0]?.welcome_text}</span>
            </div>
          )}
          {portfolioDetails ? (
            <div>
              <section data-section id="home">
                <HomePage />
              </section>
              <section data-section id="experience">
                <Experience />
              </section>
              <section data-section id="skills">
                <Skills />
              </section>
              <section data-section id="certifications">
                <Certify />
              </section>
              <section data-section id="pocProjects">
                <PocProjects />
              </section>
              <section data-section id="education">
                <Education />
              </section>
              <section data-section id="about">
                <Aboutme />
              </section>
              <section data-section id="interests">
                <Interest />
              </section>
            </div>
          ) : (
            <LoadingSpinner stateFronLocal={true} />
          )}

          <div>
            <button
              onClick={() => {
                document.documentElement.scrollTop = 0;
              }}
              className="scrollToTopFloatBtn"
              id="scrollToTopFloatBtn"
            >
              Scroll Top
            </button>
          </div>
          <div className="d-flex justify-content-end">
            {!localStorage.getItem("feedback") && (
              <button
                className="btn btn-sm btn-info"
                onClick={() => setIsShow(true)}
              >
                Give Feedback
              </button>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default WelcomePage;

{
  /* <BlogFeedback /> */
}

{
  /* <FeedbackModel isShow={isShow} setIsShow={setIsShow} setFeedBack={setFeedBack} feedBack={feedBack} /> */
}

// const handleScroll = () => {
//     const pageYOffset = window.pageYOffset;
//     let newActiveSection = null;
//     sections.current.forEach((section) => {
//         const sectionOffsetTop = section.offsetTop;
//         const sectionHeight = section.offsetHeight;
//         if (pageYOffset >= sectionOffsetTop && pageYOffset < sectionOffsetTop + sectionHeight) {
//             newActiveSection = section.id;
//         }
//     });

//     setActiveSection(newActiveSection);

// };
// window.onscroll = () => scrollFunction(themeMode);
// useEffect(() => {
//     sections.current = document.querySelectorAll('[data-section]');
//     window.addEventListener('scroll', handleScroll);
//     if (activeSection == 'interests') {
//         if (!localStorage.getItem('feedback')) {
//             setIsShow(true)
//         }
//     }
//     return () => {
//         window.removeEventListener('scroll', handleScroll);
//     };
// }, [activeSection]);
