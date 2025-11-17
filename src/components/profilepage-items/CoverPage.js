"use client";
import { useState } from 'react'
import { Button, Container } from '@mui/material'
import NavbarHeader from './NavbarHeader'
import { navItemsCoverPage, scrollFunction } from './NavUtils';
import './CSS/CoverPageStyles.css';
import Link from 'next/link';
import Aboutme from '../elements/Aboutme';

const CoverPage = () => {
    const [themeMode, setThemeMode] = useState(true);
    // const history = useHistory()
    window.onscroll = () => scrollFunction(themeMode);

    return (
        <div style={{ backgroundColor: themeMode ? 'white' : 'black' }}>
            <NavbarHeader logoTitle={'MYSPACEBLOG'} navbarItems={navItemsCoverPage} setThemeMode={setThemeMode} themeMode={themeMode} />

            <Container >
                <div className='vh-100'>
                    <div className='d-block justify-content-center '>
                        <h1 className='m-5 mb-0 p-5 pb-0 text-uppercase title '
                            style={{ color: themeMode ? 'black' : 'lightblue' }}>Welcome to myspace blog</h1>
                        <div className='titleDesc p-4'>
                            Rajesh, is a full-stack developer. He blogs mostly on modern Javascript, HTML, CSS, and everything web development-related.
                            In recent years he has gained experience in single-page applications.
                        </div>
                    </div>
                    <div className='m-0 '>
                        {/* <Button size='sm' variant='outline-primary' onClick={()=>history.push('/rajeshprofile')}>View Profile</Button> */}
                        <Link href='/rajeshprofile'>
                          <Button className='btn btn-sm btn-outline-info'>View Profile</Button>
                        </Link>
                    </div>
                    <div className='m-5 aboutmediv'>
                        <Aboutme />
                    </div>
                </div>
                <div >
                    <button
                        onClick={() => {
                            document.documentElement.scrollTop = 0;
                            // document.body.scrollTop = 0;
                        }}
                        className='scrollToTopFloatBtn' id='scrollToTopFloatBtn'>Scroll Top</button>
                </div>
            </Container>
        </div>
    )
}

export default CoverPage