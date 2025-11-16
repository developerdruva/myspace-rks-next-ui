"use client";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import apiServices from "@/utils/service-calls/apiServices";
import { showAlertNotice, successMsg } from "../CommonFunction";

const FeedbackModel = ({ isShow, setIsShow, feedBack, setFeedBack }) => {
  return (
    <div>
      <Dialog open={isShow} onClose={() => setIsShow(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Hi there! Please give some feedback
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={feedBack}
            enableReinitialize={true}
            // validationSchema={{
            //     feedbackDesc: Yup.string().notRequired('Required'),
            // }}
            onSubmit={(values) => {
              apiServices.saveFeedbackForm(values).then((res) => {
                console.log("values ", values);
                console.log("res ", res);
                if (res?.data?.status === "success") {
                  localStorage.setItem("feedback", true);
                  setIsShow(false);
                  showAlertNotice(res?.data?.message, res?.data?.status);
                }
              });
            }}
          >
            {({
              errors,
              handleChange,
              setFieldValue,
              touched,
              handleSubmit,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <div>
                  Liked:{" "}
                  <MdThumbUp
                    size={25}
                    style={{
                      color: feedBack.like ? "green" : "black",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setFeedBack({
                        ...feedBack,
                        like: !feedBack.like,
                        unlike: feedBack.unlike,
                      });
                    }}
                  />
                </div>
                <div>
                  Unlike:{" "}
                  <MdThumbDown
                    size={25}
                    style={{
                      color: feedBack.unlike ? "red" : "black",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setFeedBack({
                        ...feedBack,
                        like: feedBack.like,
                        unlike: !feedBack.unlike,
                      });
                    }}
                    disabled
                  />
                </div>
                <div>Any suggestions please type below:</div>
                <textarea
                  type="text"
                  className="form-control"
                  name="feedbackDesc"
                  placeholder="feedback"
                  onChange={(e) => handleChange(e)}
                />
                <small className="text-danger form-text">
                  <ErrorMessage name="feedbackDesc" />
                </small>

                {/* <div>
                                    <label>
                                        <input type="radio" name="test" value="small" checked />
                                        <img src="https://via.placeholder.com/40x60/0bf/fff&text=A" alt="Option 1" />
                                    </label>

                                    <label>
                                        <input type="radio" name="test" value="big" />
                                        <img src="https://via.placeholder.com/40x60/b0f/fff&text=B" alt="Option 2" />
                                    </label>
                                </div> */}
                <div className="m-3">
                  <Button type="submit" variant="contained" size="small" className="me-2">
                    Submit
                  </Button>
                  <Button
                    onClick={() => setIsShow(false)}
                    variant="outlined"
                    size="small"
                  >
                    Close
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackModel;

/**
 *  if (feedBack.unlike) {
                                            setFeedBack({ ...feedBack, like: !feedBack.unlike })
                                        } else {
                                            setFeedBack({ ...feedBack, like: !feedBack.like })
                                        }

                                         if (feedBack.like) {
                                            setFeedBack({ ...feedBack, unlike: !feedBack.like })

                                        } else {
                                            setFeedBack({ ...feedBack, unlike: !feedBack.unlike })

                                        }

 */
