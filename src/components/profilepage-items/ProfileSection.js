"use client";
import Loading from "@/common/commonComps/Loader";
import FeedbackModel from "@/common/CommonModels/FeedbackModel";
import Aboutme from "@/components/elements/Aboutme";
import BlogFeedback from "@/components/elements/BlogFeedback";
import Certify from "@/components/elements/Certify";
import Education from "@/components/elements/Education";
import Experience from "@/components/elements/Experience";
import HomePage from "@/components/elements/HomePage";
import Interest from "@/components/elements/Interest";
import PocProjects from "@/components/elements/PocProjects";
import Skills from "@/components/elements/Skills";
import { Chip, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CSS/WelcomeStyles.css";
import FooterPage from "./FooterPage";
import NavbarHeader from "./NavbarHeader";
import { navbarItemsUtils } from "./NavUtils";

const ProfileSection = () => {
  const portfolioDetails =
    useSelector((state) => state?.portfolioState) || null;
  const [isShow, setIsShow] = useState(false);
  const [activeSection, setActiveSection] = useState("home"); // Default section to home
  const person = portfolioDetails?.personDetails?.[0] || null;

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
        logoTitle={"myspace.profile"}
        scrollTo={scrollTo}
        activeSection={activeSection}
      />{" "}
      {portfolioDetails ? (
        <>
          <Container
            maxWidth="lg"
            sx={{
              px: { xs: 1, sm: 2, md: 3, lg: 4 }, // horizontal padding adjusts by screen
              py: { xs: 1, sm: 2, md: 3 }, // vertical padding adjusts by screen
            }}
          >
            <Chip
              className="welcometext"
              label={person?.welcome_text + "rajesh.thedeveloper"}
              variant="filled"
              size="small"
              color="default"
              component={"div"}
            ></Chip>

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

            <BlogFeedback />
            <FeedbackModel
              isShow={isShow}
              setIsShow={setIsShow}
              feedBack={{}}
            />
          </Container>

          <FooterPage />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProfileSection;
