"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Certify.module.css";

const Certify = () => {
  const portfolioDetails = useSelector((state) => state?.portfolioState);
  const certifications = portfolioDetails?.certifications;
  const [isModal, setIsModal] = useState(false);
  const [certify, setCertify] = useState(null);

  return (
    <Fragment>
      <div className={styles.box} id="certify">
        <span className={"headingForSection"}>
          CERTIFICATIONS OF COURSE COMPLETION
        </span>
        <div className="mt-3">
          <div className="d-flex justify-content-center row p-5 pt-0">
            {certifications?.map((certItem, certIndex) => (
              <div className="col-md-4 mt-3" key={certIndex}>
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
        <Dialog open={isModal} maxWidth="lg" onClose={() => setIsModal(false)}>
          <DialogTitle className="lead text-info">{certify.name}</DialogTitle>
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
