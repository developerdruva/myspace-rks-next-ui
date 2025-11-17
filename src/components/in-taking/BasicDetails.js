"use client";
import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import apiServices from '@/utils/service-calls/apiServices';
import { showAlertNotice } from '@/common/CommonFunction';
import { BsEye } from 'react-icons/bs';

const BasicDetails = ({ personDetails }) => {
    const [isValidUser, setIsValidUser] = useState(false)
    const [isPasswordOk, setisPasswordOk] = useState(true)
    const router = useRouter();
    const [initialValues, setInitialValues] = useState({
        first_name: '',
        last_name: '',
        email_id: '',
        mobile_no: '',
        roleof_person: '',
        person_designation: '',
        profile_pic: '',
        person_resume: '',
        welcome_text: '',
    });

    useEffect(() => {
        setInitialValues(personDetails)
    }, [])

    const submitForm = (values, resetForm) => {
        console.log('hi in submitform')
        console.log('values -> ', values)
        let formData = new FormData();
        Object.keys(values)?.forEach(key => {
            formData.append(key, values[key])
        })
        apiServices.saveProfileDetails(formData).then(res => {
            if (res?.data?.status === 'success') {
                showAlertNotice(res?.data?.message, 'success').then(r => {
                    router.push('/')
                    localStorage?.clear()
                })
            } else {
                showAlertNotice(res?.data?.message, 'error')
            }
            console.log(' res ', res)
        })
    }
    return (
        <div className='container '>
            <Formik
                initialValues={initialValues} enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    // email: Yup.string().required("This field is Required!"),
                    // password: Yup.string().required("This field is Required!"),
                    // profile_pic: Yup.mixed().required(),
                })}
                onSubmit={(values, { resetForm }) => {
                    console.log(' hello in on submit', values)
                    // if(values?.password === values)
                    submitForm(values, resetForm);
                }}
            >
                {({ errors, handleChange, setFieldValue, touched, resetForm, handleSubmit, values }) => (
                    <form onSubmit={handleSubmit} noValidate className=" w-100 " >
                        <div className='row p-2'>

                            <div className='col-md-4 p-2'>

                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="firstName" >First Name</label>
                                        </div>
                                        <Field type="text" className="form-control " name="first_name" placeholder='' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="lastName" >Last Name</label>
                                        </div>
                                        <Field type="text" className="form-control " name="last_name" placeholder='' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="email_id">Email</label>
                                        </div>
                                        <Field type="email" className="form-control" name="email_id" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="mobile_no" >Mobile</label>
                                        </div>
                                        <Field type="tel" className="form-control " name="mobile_no" placeholder='' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="city" >Role of Person</label>
                                        </div>
                                        <Field type="text" className="form-control " name="roleof_person" placeholder='' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="person_designation" >Person Designation</label>
                                        </div>
                                        <Field type="text" className="form-control " name="person_designation" placeholder='' />
                                    </Col>
                                </Row>

                            </div>
                            <div className='col-md-4 p-2'>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="welcome_text" >Welcome Text</label>
                                        </div>
                                        <Field type="text" className="form-control " name="welcome_text" placeholder='' />
                                    </Col>
                                </Row>
                                <Row className="mb-1 ">
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="profile_pic">Upload Profile Picture&nbsp;&nbsp;
                                                &nbsp;&nbsp;                                            {
                                                    values?.profile_pic && <a href={values?.profile_pic} target='_blank' style={{ textDecoration: 'none', fontSize: '0.6rem' }}><span >Existed File<BsEye className='m-1 mb-2' size={12} /></span></a>
                                                }   </label>
                                        </div>
                                        <input type="file" className="form-control" name="profile_pic" accept='image/png, .svg, image/jpeg'
                                            onChange={(e) => setFieldValue(e?.target?.name, e?.target?.files[0])}
                                        />

                                    </Col>
                                </Row>
                                <Row className="mb-1 ">
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="">Upload Resume&nbsp;&nbsp;
                                                &nbsp;&nbsp;                                            {
                                                    values?.resume && <a href={values?.resume} target='_blank' style={{ textDecoration: 'none', fontSize: '0.6rem' }}><span >Existed File<BsEye className='m-1 mb-2' size={12} /></span></a>
                                                } </label>
                                        </div>
                                        <input type="file" className="form-control" name="resume"
                                            onChange={(e) => setFieldValue(e?.target?.name, e?.target?.files[0])}

                                        />
                                    </Col>
                                </Row>
                                <div className='d-flex justify-content-center align-items-center m-5 p-5'>
                                    <Button type="reset" className='btn btn-warning btn-sm mx-2' onClick={() => { resetForm(); }}>Reset</Button>
                                    {
                                        personDetails != '' ?
                                            <Button type='submit' className='btn btn-sm'  >Update</Button>

                                            :
                                            <Button type='submit' className='btn btn-sm'  >Submit</Button>

                                    }

                                </div>
                            </div>
                            <div className='col-md-4 '>
                                {/* {
                                    Object.keys(values).map(key => (
                                        <div>{key} &nbsp;<b>{values[key]}</b></div>
                                    ))
                                } */}
                            </div>

                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default BasicDetails
