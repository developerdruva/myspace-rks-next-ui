"use client";
import { useEffect, useState } from 'react';
import './scrollspy.css';
import NavbarHeader from '../NavbarHeader';

const sections = [
  { id: 'section1', label: 'Section 1' },
  { id: 'section2', label: 'Section 2' },
  { id: 'section3', label: 'Section 3' },
  { id: 'section4', label: 'Section 4' },
];

export default function ScrollSpyVertical() {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      for (let section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // call initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarOffset = 100; // Adjust this to match your navbar height
      const elementPosition = el.offsetTop;
      const offsetPosition = elementPosition - navbarOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <nav className="horizontal-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-item ${activeId === section.id ? 'active' : ''}`}
            onClick={() => scrollTo(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>
      {/* <NavbarHeader /> */}

      <div className="vertical-sections">
        {sections.map((section) => (
          <div className="section" id={section.id} key={section.id}>
            <h2>{section.label}</h2>
            <p>Content for {section.label} goes here. Scroll to test the spy effect.</p>
          </div>
        ))}
      </div>
    </div>
  );
}