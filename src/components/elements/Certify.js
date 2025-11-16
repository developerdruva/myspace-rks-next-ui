"use client";
import { Fragment, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import certificate from "../images/certificate.jpg";
import java from "../images/Java.png";
import python from "../images/Python.png";
import styles from "../styles/Certify.module.css";
import { useSelector } from "react-redux";

const Certify = () => {
  const portfolioDetails = useSelector((state) => state?.portfolioState);
  const certifications = portfolioDetails?.certifications;
  const [isModal, setIsModal] = useState(false);
  const [certify, setCertify] = useState(null);

  return (
    <Fragment>
      <div className={styles.box} id="certify">
        <span className={styles.head}>CERTIFICATIONS OF COURSE COMPLETION</span>
        {/* <h2 className={styles.heading}>MY EDUCATION DETAILS</h2> */}
        <div className="mt-3">
          <div className="d-flex justify-content-center row p-5 pt-0">
            {certifications?.map((certItem, certIndex) => (
              <div className="col-md-4 mt-3" key={certIndex}>
                {/* <div className='card-text'>
                                        <p className='text-info text-center m-0'>{certItem?.certify_name}</p>
                                    </div> */}
                <div className={`card text-secondary border-0`}>
                  <div
                    className={`card-body ${styles.cardimg}`}
                    onClick={() => {
                      setIsModal(true);
                      setCertify({
                        name: certItem?.certify_name,
                        image: certItem?.certify_url,
                      });
                    }}
                  >
                    <img
                      className={`card-img-top `}
                      src={certItem?.certify_url}
                      alt={`Certification - ${certIndex + 1}`}
                    ></img>
                    <div className={`card-img-overlay ${styles.hide} `}>
                      {/* <button className='btn btn-info ' >View</button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {certify && (
        <Dialog
          open={isModal}
          maxWidth="lg"
          onClose={() => setIsModal(false)}
        >
          <DialogTitle className="lead text-info">
            {certify.name}
          </DialogTitle>
          <DialogContent align="center">
            {certify.image ? (
              <img
                src={certify.image}
                alt="certificate"
                style={{ width: "35rem", height: "30rem" }}
              />
            ) : (
              <p>comming soon......</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsModal(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Fragment>
  );
};

export default Certify;

{
  /**
<div className="col-md-4">
                                <div className={`card text-secondary border-0`}>
                                    <div className={`card-body ${styles.cardimg}`}>
                                        <img className={`card-img-top `} src={java} alt="Card cap" style={{width:'10rem',height:'15rem'}}></img>
                                        <div className={`card-img-overlay ${styles.hide} `}>
                                            <button className='btn btn-info ' onClick={()=>{setIsModal(true);setCertify({name : 'Java & J2EE', image : java})}}>View</button>
                                        </div>
                                    </div>
                                    <div className='card-text'>
                                        <p className='text-info text-center'>Java</p>
                                    </div>
                                </div> 
                            </div>
                            <div className="col-md-4">
                                <div className={`card text-secondary border-0`}>
                                    <div className={`card-body ${styles.cardimg}`}>
                                        <img className={`card-img-top `} src={python} alt="Card cap"></img>
                                        <div className={`card-img-overlay ${styles.hide} `}>
                                            <button onClick={()=>{setIsModal(true);setCertify({name : 'Python', image : python})}} className='btn btn-info '>View</button>
                                        </div>
                                    </div>
                                    <div className='card-text'>
                                        <p className='text-info text-center'>Python</p>
                                    </div>
                                </div>
                            </div>
                            
*/
}
