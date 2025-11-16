"use client";
import { Fragment } from 'react';
import myspaceimg from '../images/myspace.png';
import streamlineimg from '../images/streamline.png';
import sudoshopimg from '../images/sudoshop.png';
import styles from '../styles/PocWorks.module.css';
import { useSelector } from 'react-redux';

const PocProjects = () => {
    const portfolioDetails = useSelector(state => state?.portfolioState);
    const pocProjects = portfolioDetails?.pocProjects
    const usedTechsOfPoc = portfolioDetails?.usedTechsOfPoc

    return (
        <Fragment>
            <div className={styles.box} id='works'>
                <span className={styles.head}>MY POC PROJECT WORKS </span>
                {/* <h2 className={styles.heading}>MY WORK DETAILS</h2> */}
                <div className="row  ">
                    {
                        pocProjects?.map((pocItem, pocIndex) => {
                            return <div className="col-md-4">
                                <div className={`card text-secondary border-0`}>
                                    <div className={`card-body ${styles.cardimg}`}>
                                        <img className={`card-img-top btn `} src={pocItem?.img_url} alt="Card cap"
                                            onClick={() => window?.open(pocItem?.project_url, '_blank')}
                                        ></img>
                                    </div>
                                    <div className='card-heading'>
                                        <p className='text-info text-center'>{pocItem?.title} <span className='text-primary' style={{ fontSize: '0.65rem' }}>({pocItem?.project_type})</span></p>
                                    </div>
                                </div>
                                {

                                    <div className=''>
                                        <p className='m-0 p-0 lead fs-6 text-decoration-underline' align='justify'>Technologies Used</p>
                                        <div className={`${styles.techsDiv} m-0 p-0`} >
                                            <p align='justify' className='m-0 lead fs-6 fw-bold'>
                                                Design:
                                            </p>
                                            <p align='justify' className='m-0 mb-1'>
                                                {usedTechsOfPoc?.filter(item => item?.poc_name === pocItem?.title)?.filter(item => item?.tech_for === 'Design').map(item => <span>{item?.tech_name},&nbsp;</span>)}
                                            </p>
                                            <p align='justify' className='m-0 lead fs-6 fw-bold'>
                                                Development:
                                            </p>
                                            <p align='justify' className='m-0 mb-1'>
                                                {usedTechsOfPoc?.filter(item => item?.poc_name === pocItem?.title)?.filter(item => item?.tech_for === 'Develope').map(item => <span>{item?.tech_name},&nbsp;</span>)}
                                            </p>
                                            <p align='justify' className='m-0 lead fs-6 fw-bold'>
                                                Database:
                                            </p>
                                            <p align='justify' className='m-0 mb-1'>
                                                {usedTechsOfPoc?.filter(item => item?.poc_name === pocItem?.title)?.filter(item => item?.tech_for === 'Database').map(item => <span>{item?.tech_name},&nbsp;</span>)}
                                            </p>
                                            <p align='justify' className='m-0 lead fs-6 fw-bold'>
                                                Tools & Frameworks:
                                            </p>
                                            <p align='justify' className='m-0 mb-1'>
                                                {usedTechsOfPoc?.filter(item => item?.poc_name === pocItem?.title)?.filter(item => item?.tech_for === 'Tools & Frameworks').map(item => <span>{item?.tech_name},&nbsp;</span>)}
                                            </p>
                                            <p align='justify' className='m-0 lead fs-6 fw-bold'>
                                                Deploy & Cloud:
                                            </p>
                                            <p align='justify' className='m-0 mb-1'>
                                                {usedTechsOfPoc?.filter(item => item?.poc_name === pocItem?.title)?.filter(item => item?.tech_for === 'Deploy & Cloud:').map(item => <span>{item?.tech_name},&nbsp;</span>)}
                                            </p>
                                        </div>
                                    </div>
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default PocProjects


{/**

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

*/}