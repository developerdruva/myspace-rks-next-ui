"use client";
import { useEffect, useRef } from 'react'
import { Button, Container, Table } from '@mui/material'
import { useSelector } from 'react-redux';
import { sideHeading } from '../extras/UtilsFunctions';
import { BsGithub, BsLinkedin, BsPersonBadge, BsPersonCircle, BsPhone, BsPhoneFill } from 'react-icons/bs';
import { RiProfileFill } from 'react-icons/ri';
import { SiGmail } from 'react-icons/si';
import Experience from '../../elements/Experience';
import { experience, getPocProjects, pocProjects } from '../extras/ResumeComponents';
import { useReactToPrint } from 'react-to-print';
import './ResumeTemplateStyles.css';

const ResumeTemplateSample = () => {
    const portfolioDetails = useSelector(state => state?.portfolioState) || {};
    const fieldProps = useSelector(state => state?.fieldPropState);
    const personDetails = portfolioDetails?.personDetails[1];
    const mySkills = portfolioDetails?.mySkills || []
    const workedCompanies = portfolioDetails?.workedCompanies || []
    const workedProjects = portfolioDetails?.workedProjects || []
    const pocProjects = portfolioDetails?.pocProjects || []
    const certifications = portfolioDetails?.certifications;

    const contentOfPrint = useRef(null);
    const mySkillsLen = mySkills?.length;

    useEffect(() => {
        console.log(' portfolio details ', portfolioDetails)
    }, [portfolioDetails])

    const handleReactPrint = useReactToPrint({
        content: () => contentOfPrint?.current,
        documentTitle: personDetails?.first_name + personDetails?.last_name + '-Resume',
        removeAfterPrint: true
    })

    return (
        <div>
            <Container className=''>
                <Button size='sm' onClick={() => handleReactPrint()} >Click Print</Button>
                {/* <img src={'./icons/Rlogo.png'} alt='rlogo' style={{ width: '2rem', color: 'blueviolet', backgroundColor: '', opacity: '0.2' }} /> */}
                {/* {JSON.stringify(new Date().getVarDate().replaceAll('/','-'))} */}
                <table ref={contentOfPrint} className=''
                // style={{marginTop:'10px', marginBottom:'10px', marginRight:'10px'}}
                >
                    <tbody className=''>
                        <tr>
                            <td width={'40%'} className='m-0 p-3 pt-0 '
                                style={{ lineHeight: '1.2', backgroundColor: '', alignContent: 'start', height: '', }}>
                                <div style={{ border: '', backgroundColor: '', padding: '' }}>
                                    <div className="blckDiv1" style={{ border: '' }}>
                                    </div>
                                    <div className="blckDiv1" style={{ border: '' }}>
                                    </div>
                                    <div className="blckDiv1" style={{ border: '' }}>
                                    </div>
                                    <div className="blckDiv1" style={{ border: '' }}>
                                    </div>
                                    <div style={{ textAlign: 'left', fontSize: fieldProps?.fsTitles }}>
                                        {personDetails?.first_name}&nbsp;{personDetails?.last_name}
                                    </div>
                                    <div className='m-0 mt-2'>
                                        <div style={{ textAlign: 'left', fontSize: fieldProps?.fsSubTitles, margin: '2px', padding: "0" }}>
                                            {personDetails?.roleof_person}
                                        </div>
                                        <div style={{ textAlign: 'left', fontSize: fieldProps?.fsNormal, margin: '2px', padding: "0" }}>
                                            <span className=''>
                                                <BsPhoneFill onClick={() => window.open('mailto:' + personDetails?.email_id, '_blank')} className='' />
                                                &nbsp;{personDetails?.mobile_no}
                                            </span>
                                        </div>
                                        <div style={{ textAlign: 'left', fontSize: fieldProps?.fsNormal, margin: '2px', padding: "0" }}>
                                            <span className=''>
                                                <SiGmail onClick={() => window.open('mailto:' + personDetails?.email_id, '_blank')} className='' />
                                                &nbsp;{personDetails?.email_id}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-start m-0 mt-2 mb-2 p-0 text-dark  '>
                                        <span className='btn m-0 p-0 me-5'><a size={16} href={personDetails?.myblog_url} target='_blank' className='text-dark' ><BsPersonCircle /> </a></span>
                                        {personDetails?.linkedin_url && <span className='btn m-0 p-0 me-5'><a size={16} href={personDetails?.linkedin_url} className='text-dark'><BsLinkedin /> </a></span>}
                                        {personDetails?.git_url && <span className='btn m-0 p-0 me-5'><a size={16} href={personDetails?.git_url} className='text-dark'><BsGithub /> </a></span>}
                                        <span className='btn m-0 p-0 me-5'><a size={16} href={'mailto:' + personDetails?.email_id} className='text-dark'><SiGmail /> </a></span>
                                    </div>
                                    <div className='mt-3'>
                                        {sideHeading('MY SKILLS')}
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <div className='m-1 fw-bold' align='' style={{ fontSize: fieldProps?.fsNormal }}>Primary</div>
                                                <ul className=' '>
                                                    {
                                                        mySkills?.filter(item => parseInt(item?.skill_value) >= 70)?.map((item, index) => (
                                                            <li type='circle' className='' key={index} style={{ fontSize: fieldProps?.fsNormal }}><div align='justify'>{item?.skill_name}</div></li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            <div>
                                                <div className='m-1 fw-bold' style={{ fontSize: fieldProps?.fsNormal }}>Secondary</div>
                                                <ul className=' '>
                                                    {
                                                        mySkills?.filter(item => parseInt(item?.skill_value) < 70)?.map((item, index) => (
                                                            <li type='circle' className='' key={index} style={{ fontSize: fieldProps?.fsNormal }}><div align='justify'>{item?.skill_name}</div></li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-0'>
                                        {sideHeading('EDUCATION')}
                                        <ul className='' style={{ fontSize: fieldProps?.fsNormal, textAlign: "left" }}>
                                            <li type='circle' key={0}>B.Tech - Computer Science - RGUKT</li>
                                            <li type='circle' key={1}>PUC (Inter) - MPC - RGUKT</li>
                                            <li type='circle' key={3}>SSC - ZPP High School</li>
                                        </ul>
                                    </div>
                                    <div className='mt-1'>
                                        {sideHeading('CERTIFICATIONS')}
                                        <ul className='mt-1'>
                                            {
                                                certifications?.map((item, index) => (
                                                    <li key={index} style={{ fontSize: fieldProps?.fsNormal }}>
                                                        <div align='justify'>{item?.certify_name}&nbsp;
                                                            <a href={item?.certify_url} target='_blank' className='text-decoration-none'>View</a>

                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="blckDiv4" style={{ border: '' }}>
                                </div>
                                <div className="blckDiv5" style={{ border: '' }}>
                                </div>
                                <div className="blckDiv6" style={{ border: '' }}>
                                </div>
                            </td>
                            <td width={'60%'} className='p-3 m-0 '
                                style={{ zIndex: '', opacity: 1, alignContent: '' }}
                            >
                                <div className='mt-0' style={{ zIndex: '10' }}>
                                    {sideHeading('SUMMARY')}
                                    <p className='m-0 p-0' align='justify' style={{ fontSize: fieldProps?.fsSmall }}>
                                        {portfolioDetails?.summaryEducation?.map((sumItem, sumIndex) => {
                                            return <span>{sumItem?.summary_desc}&nbsp;</span>
                                        })}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    {sideHeading('EXPERIENCE')}
                                    <div>
                                        {
                                            portfolioDetails ?
                                                experience(workedCompanies, workedProjects, fieldProps)
                                                : null}
                                    </div>
                                </div>
                                <div>
                                    {sideHeading('POC PROJECTS')}
                                    {
                                        portfolioDetails ?
                                            getPocProjects(pocProjects, fieldProps)
                                            : null}
                                </div>

                            </td>
                        </tr>

                    </tbody>
                </table>

            </Container>
        </div>
    )
}

export default ResumeTemplateSample


{/* <ul className='' style={{ fontSize: fieldProps?.fsNormal, textAlign: "left", margin: '0' }}>
                                            {
                                                mySkills?.map((item, index) => (
                                                    <li type='circle' key={index}>{item?.skill_name}</li>
                                                ))
                                            }
                                        </ul> */}