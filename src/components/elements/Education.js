"use client";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import styles from '../styles/Education.module.css';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

const Education = () => {
    const portfolioDetails = useSelector(state => state?.portfolioState);
    const themeModeFrmRdx = useSelector(state => state?.themeModeState?.themeMode);
    const educationDetails = portfolioDetails?.myStudies;
    const setToDom = (text) => {
        let doc = document.createElement('div');
        doc.innerHTML = text;
        return doc.innerHTML;
    }
    return (
        <div className={styles.box} id="education"
            style={{ backgroundColor: themeModeFrmRdx ? 'white' : 'black', overflow: 'hidden' }}

        >
            <span className={styles.head}>EDUCATION</span>
            {/* <h2 className={styles.heading}>MY EDUCATION DETAILS</h2> */}
            <div className={'mt-3'}>
                {
                    educationDetails?.map((eduItem, eduIndex) => (
                        <Accordion key={eduIndex}
                            style={{ backgroundColor: themeModeFrmRdx ? 'white' : 'black', overflow: 'hidden'
                                , color:themeModeFrmRdx ? 'black': 'lightgrey',
                             }}
                        >
                            <AccordionSummary expandIcon={<span>▼</span>}>
                                <div className='d-flex justify-content-between '
                                >
                                    <span >{eduItem?.study}</span>
                                    {/* <span>{eduItem?.pass_percent}%</span> */}
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p align='justify'>
                                    {parse(eduItem?.study_desc)}
                                </p>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </div>
        </div>
    )
}

export default Education;

{/**
 <Accordion.Item eventKey="1">
                    <Accordion.Header> PUC - AP IIIT</Accordion.Header>
                    <Accordion.Body>
                        I was completed <b>Pre University Course</b> equivalid to Intermediat in the stream of <b>MPC</b> at <b><a href='https://rguktn.ac.in/' target='_blank' rel="noopener noreferrer">RGUKT AP <i>IIIT</i> Nuzvid</a></b> with 72% in the year of 2014
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>SSC - Z P P HIGH SCHOOL</Accordion.Header>
                    <Accordion.Body>
                        I completed <b>SSC</b> at <b>ZPP High School</b> at Local Govt School with 9.7 CGPA in the year of 2012
                    </Accordion.Body>
                </Accordion.Item>
*/}