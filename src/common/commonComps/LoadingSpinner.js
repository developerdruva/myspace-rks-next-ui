"use client";
import { useSelector } from "react-redux";

const LoadingSpinner = ({ stateFronLocal }) => {
  const loaderState = useSelector((state) => state?.spinner);
  return (
    <div>
      {/* {
                loaderState?.showSpinner ? <CircularProgress /> : null
            }*/}
      {
        // stateFronLocal || loaderState?.showSpinner ?
        // <Flex gap="middle" vertical>
        //     <Flex gap="middle">
        //         <Spin tip="Loading......." size="large">
        //             <div></div>
        //         </Spin>
        //     </Flex>
        // </Flex>
        <div
          style={{
            zIndex: "10000",
            border: "1px solid red",
            position: "fixed",
            top: "40%",
            left: "45%",
          }}
        >
          <div className="loader"></div>
          <div className="loadingText">Please wait loading.....</div>
        </div>

        // : null
      }
      {/* {
                stateFronLocal || loaderState?.showSpinner ?
                    <div className="ringSpin">Loading..!
                        <span></span>
                    </div>
                    : null
            } */}
    </div>
  );
};

export default LoadingSpinner;
