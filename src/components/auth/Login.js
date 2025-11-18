"use client";
import { Field, Formik } from 'formik';
import { useState } from 'react';
import { Button, Card, Grid, Container } from '@mui/material';
import * as Yup from 'yup';
// import apiServices from '../../utils/service-calls/apiServices';
// import '../login/LoginStyles.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { showAlertNotice } from '@/common/CommonFunction';
import apiServices from '@/utils/service-calls/apiServices';
import { BsArrowBarLeft, BsArrowLeft, BsBack } from 'react-icons/bs';
// import { showAlertNotice } from '../../common/CommonFunction';

const Login = ({ setLoggedIn, initialDetails, loggedIn }) => {
    const router = useRouter();
    const [initialValues] = useState({
        emailId: '',
        password: '',
    });
    // const themeMode = useSelector(state => state?.themeModeState?.themeMode);

    const submitForm = (values, resetForm) => {
        console.log('values ---->', values)
        apiServices.userLogin(values).then(res => {
            localStorage?.setItem('token', res?.data?.auth_token)
            if (res?.data?.status === 'success') {
                // setLoggedIn(true)
                localStorage.setItem('token', res?.data?.auth_token);
                showAlertNotice(res?.data?.message, 'success').then(() => router.push('/adminboard'))
            } else {
                localStorage.clear()
                showAlertNotice(res?.data?.message, 'error')
            }
        })

    }
    return (
        <Container className='vh-100'>
            {/* <div className='titleText d-flex justify-content-center mt-5'>
                <p>The place for
                    <span className='m-1'><b className='text-primary text-decoration-underline'>D</b>ocuments</span>
                    <span className='m-1'><b className='text-primary text-decoration-underline' >O</b>rganizing</span>
                    <span className='m-1'><b className='text-primary text-decoration-underline'>C</b>ontroling</span>
                    <span className='m-1'><b className='text-primary text-decoration-underline'>S</b>quaring</span>
                </p>
            </div> */}
            <div style={{ margin: 'auto' }} className='m-5'>
                <div style={{ alignContent: 'center', margin: 'auto' }} className='text-dark lead fs-3'>
                    Admin Login
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <div className='col-md-4 loginDiv'>
                    <Formik
                        initialValues={initialValues} enableReinitialize={true}
                        // validationSchema={Yup.object().shape({
                        //     email: Yup.string().required("This field is Required!"),
                        //     password: Yup.string().required("This field is Required!"),
                        // })}
                        onSubmit={(values, { resetForm }) => {
                            submitForm(values, resetForm);
                        }}
                    >
                        {({ errors, handleChange, setFieldValue, touched, handleSubmit, values }) => (
                            <form noValidate onSubmit={handleSubmit} className='loginForm'>
                                <Card className={`p-5 border shadow `} >
                                    <div className='d-flex justify-content-start m-0 mb-2'>
                                        <BsArrowLeft style={{ cursor: 'pointer' }} size={20}
                                            onClick={() => navigate('/')}
                                        />
                                    </div>
                                    {/* {JSON.stringify(themeMode)} */}
                                    {/* <Card.Title className='m-0 p-1'>Please Login</Card.Title> */}
                                    <Row className='mb-2'>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                                            <div className='d-flex justify-content-start'>
                                                <label htmlFor="emailId" className=''>Email</label>
                                            </div>
                                            <Field type="text" name="emailId" className="form-control"
                                            // className={`${themeMode ? '' : 'bg-secondary'} form-control`} />
                                            />
                                        </Col>
                                    </Row>
                                    {/* {JSON.stringify(initialDetails?.mstUsers)} */}
                                    <Row className='mb-2'>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                                            <div className='d-flex justify-content-start'>
                                                <label htmlFor="passw">Password</label>
                                            </div>
                                            <Field type="password" name="password" className="form-control"
                                            // className={`${themeMode ? '' : 'bg-secondary'} form-control`} />
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                                            <Button type="reset" className='btn btn-warning btn-sm m-2'>Reset</Button>
                                            <Button type="submit" className='btn btn-primary btn-sm'>Login</Button>
                                        </Col>
                                    </Row>
                                    {/* <Row className='mb-2'>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                                            <div>New user Register here.</div>
                                            <Link to={'/register'} className=' m-2'>Register</Link>
                                        </Col>
                                    </Row> */}
                                </Card>

                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </Container>
    )
}

export default Login