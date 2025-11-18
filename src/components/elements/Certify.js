"use client";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
        <span className={"headingForSection"}>COURSES & CERTIFICATES</span>
        <Grid container spacing={2}>
          {certifications?.map((certItem, certIndex) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={certIndex}>
              <Card>
                <CardContent
                  sx={{ padding: 0 }}
                  className={`${styles.cardimg}`}
                  onClick={() => {
                    setIsModal(true);
                    setCertify({
                      name: certItem?.certify_name,
                      image: certItem?.certify_url,
                    });
                  }}
                >
                  <img
                    src={certItem?.certify_url}
                    alt={`Certification - ${certIndex + 1}`}
                  ></img>
                </CardContent>
                {/* <CardActions sx={{ justifyContent: "center" }}>
                  <Chip
                    label={certItem?.certify_type}
                    variant="outlined"
                    size="small"
                    color="default"
                  />
                </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
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
