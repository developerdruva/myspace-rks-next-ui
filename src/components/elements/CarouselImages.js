"use client";
import { IoIosEye } from "react-icons/io";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ontrack from "../images/rajwall4.jpg";
// import '../styles/CarouselImages.module.css';
import "../styles/CarouselWelcomeStyles.css";

const CarouselImages = () => {
  return (
    <div className="p-0 m-0" id="start">
      <div className="border border-primary">
        <div className="vh-100"></div>

        <div className="welcomeText">Hello there! Welcome to mySpace</div>

        <div className={"nameStyle"}>
          <h1 className="display-1" style={{ fontFamily: "darlington" }}>
            Rajesh Kumar
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CarouselImages;

{
  /* <Carousel className={classes.carousel} dynamicHeight infiniteLoop={true} interval={10000} useKeyboardArrows={true} transitionTime={1700} emulateTouch showArrows={true} showIndicators={false} autoPlay showStatus={false} showThumbs={false} >
                         <img className='vh-100' src={ontrack} alt="myImage" style={{width:'100%',padding: '0px', margin: '0px'}}/> 
                    
                         <a href="#res" rel="" className={classes.cv} target="_blank">Resume <IoIosEye/></a> 
                   
                </Carousel> */
}
