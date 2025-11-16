"use client";
import { Component, Fragment } from 'react';
import { SiGithub, SiGmail, SiLinkedin } from "react-icons/si";
import photo from '../images/raj.JPG';
import '../styles/Sidebar.css';

class Sidebar extends Component {
    render() {

        return (
            <Fragment>
                <div className="sidebar" >
                    <img src={photo} alt='sample' className='mt-5 ' />
                    <p style={{ color: '', fontSize: '1rem' }} className="mt-4 text-dark"> #fullstackdeveloper </p>
                    
                    <h1 className='m-0 p-0'><a  href="/#start" style={{fontSize: '2rem', fontFamily: 'ubuntu'}}  className="text-decoration-none">Rajesh Kumar</a></h1>
                    
                    <ul className="sidebar-nav "  >
                        <li className="mt-2"><a style={{textDecoration: 'none'}}  href="/#start" className="links">Home</a></li>
                        <li className="mt-2"><a style={{textDecoration: 'none'}}  href="/#about" className="links">About</a></li>
                        <li className="mt-2"><a style={{textDecoration: 'none'}}  href="/#interest" className="links">Interest</a></li>
                        <li className="mt-2"><a style={{textDecoration: 'none'}}  href="/#experience" className="links" >Experience</a></li>
                        <li className="mt-2"><a style={{textDecoration: 'none'}}  href="/#skills" className="links">Skills</a></li>
                        <li className="mt-2"><a style={{textDecoration: 'none'}}  href="/#education" className="links">Education</a></li>
                        <li className="mt-2"><a style={{textDecoration: 'none'}}  href="/#certify" className="links">Certifications</a></li>
                        <li className="mt-2"><a style={{textDecoration: 'none'}}  href="/#works" className="links">Works | Projects</a></li>
                    </ul>
                    
                     <ul className="btn-group" style={{marginLeft: '-30px'}}>
                        <li className="btn "> <a href="https://github.com/developerdruva" rel="noopener noreferrer" target="_blank" ><SiGithub/></a></li>
                        <li className="btn"><a href="https://www.linkedin.com/in/rajesh-kumar-sannala/" rel="noopener noreferrer" target="_blank"><SiLinkedin/></a></li>
                        <li className="btn"> <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noopener noreferrer" ><SiGmail/></a></li>
                    </ul>
                    <div className='d-flex m-0'>
                        <p className='text-secondary text-center'>
                            <small>This information about <b>Rajesh Kumar Sannala</b> any queries please reach to <a href='mailto:developer.rajeshkumars@gmail.com' target='_blank' rel="noopener noreferrer" >developer.rajeshkumars@gmail.com</a> </small>
                        </p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Sidebar