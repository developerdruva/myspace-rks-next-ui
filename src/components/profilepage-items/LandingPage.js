"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CSS/WelcomeStyles.css";
import FooterPage from "./FooterPage";
import NavbarHeader from "./NavbarHeader";
import { navbarItemsUtils } from "./NavUtils";
import FeedbackModel from "@/common/CommonModels/FeedbackModel";
import BlogFeedback from "@/components/elements/BlogFeedback";
import LoadingSpinner from "@/common/commonComps/LoadingSpinner";
import { Container } from "@mui/material";
import HomePage from "@/components/elements/HomePage";
import Experience from "@/components/elements/Experience";
import Skills from "@/components/elements/Skills";
import Certify from "@/components/elements/Certify";
import PocProjects from "@/components/elements/PocProjects";
import Education from "@/components/elements/Education";
import Aboutme from "@/components/elements/Aboutme";
import Interest from "@/components/elements/Interest";
const LandingPage = () => {
  const portfolioDetails =
    useSelector((state) => state?.portfolioState) || null;
  const [isShow, setIsShow] = useState(false);
  const [activeSection, setActiveSection] = useState("home"); // Default section to home

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    let currentSection = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        currentSection = section.id;
      }
    });
    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  };
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarOffset = 100; // Adjust this to match your navbar height
      const elementPosition = el.offsetTop;
      const offsetPosition = elementPosition - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div>
      <NavbarHeader
        navbarItems={navbarItemsUtils}
        logoTitle={"myspace.developerprofile"}
        scrollTo={scrollTo}
        activeSection={activeSection}
      />

      <Container maxWidth={"xl"} style={{ padding: 0 }}>
        {portfolioDetails?.personDetails[0]?.welcome_text && (
          <div className="m-0 p-0 welcometext">
            <span>{portfolioDetails?.personDetails[0]?.welcome_text}</span>
          </div>
        )}

        {portfolioDetails ? (
          <>
            <section id="home">
              <HomePage />
            </section>
            <section id="experience">
              <Experience />
            </section>
            <section id="skills">
              <Skills />
            </section>
            <section id="certifications">
              <Certify />
            </section>
            <section id="pocProjects">
              <PocProjects />
            </section>
            <section id="education">
              <Education />
            </section>
            <section id="about">
              <Aboutme />
            </section>
            <section id="interests">
              <Interest />
            </section>
          </>
        ) : (
          <LoadingSpinner stateFronLocal={true} />
        )}

        {/* <div>
          <button
            onClick={() => (document.documentElement.scrollTop = 0)}
            className="scrollToTopFloatBtn"
            id="scrollToTopFloatBtn"
          >
            Scroll Top
          </button>
        </div> */}
        <BlogFeedback />
      </Container>

      <FeedbackModel isShow={isShow} setIsShow={setIsShow} feedBack={{}} />

      <FooterPage />
    </div>
  );
};

export default LandingPage;
