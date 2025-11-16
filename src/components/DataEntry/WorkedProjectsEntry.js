"use client";

const WorkedProjectsEntry = () => {
    const personDetails = useSelector(state => state?.portfolioState?.personDetails[0]) || null;
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        company_name:"",    
        project_name:"",    
        client_name:"",     
        project_code:"",    
        project_desc:"",    
        role_name:"",       
        industry_type:"",   
        responsibilities:"",
        from_date:"",       
        to_date:"",         
        email_id:"",        
        created_ip:"",      
        created_at:"",      
        company_code:"", 
    });

    // const submitForm = (values, resetForm) => {
    //     console.log('hi in submitform')
    //     console.log('values -> ', values)
    //     if (isCompEdit) {
    //         apiServices.updateWorkedCompanies(values).then(res => {
    //             if (res?.data?.status === 'success') {
    //                 showAlertNotice(res?.data?.message, 'success').then(r => {
    //                     setShowAddModal(false)
    //                     getPortfolioDetails();
    //                     setIsCompEdit(false)
    //                     // navigate('/')
    //                     // localStorage?.clear()
    //                 })
    //             } else {
    //                 showAlertNotice(res?.data?.message, 'error')
    //             }
    //             console.log(' res ', res)
    //         })
    //     } else {
    //         apiServices.saveWorkedCompanies(values).then(res => {
    //             if (res?.data?.status === 'success') {
    //                 showAlertNotice(res?.data?.message, 'success').then(r => {
    //                     setShowAddModal(false)
    //                     getPortfolioDetails();
    //                     setIsCompEdit(false)
    //                 })
    //             } else {
    //                 showAlertNotice(res?.data?.message, 'error')
    //             }
    //             console.log(' res ', res)
    //         })
    //     }
    // }
    useEffect(() => {
        if (isCompEdit) {
            setInitialValues(compEditRecord)
        }
    })
    return (
        <div>
            <Formik
                initialValues={initialValues} enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    // profile_pic: Yup.mixed().required(),
                })}
                onSubmit={(values, { resetForm }) => {
                    console.log(' hello in on submit', values)
                    submitForm(values, resetForm);
                }}
            >
                {({ errors, handleChange, setFieldValue, touched, resetForm, handleSubmit, values }) => (
                    <form onSubmit={handleSubmit} noValidate className="  " >
                        <div className='row p-2'>

                            <div className='col-md-6 '>

                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="company_name" >Company Name</label>
                                        </div>
                                        <Field type="text" className="form-control " name="company_name" placeholder='' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="designation" >Designation</label>
                                        </div>
                                        <Field type="text" className="form-control " name="designation" placeholder='' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="from_date">From Date</label>
                                        </div>
                                        <Field type="date" className="form-control" name="from_date" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="to_date" >To Date</label>
                                        </div>
                                        <Field type="date" className="form-control " name="to_date" placeholder='' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="numberof_projects" >No of Projects Worked</label>
                                        </div>
                                        <Field type="tel" className="form-control " name="numberof_projects" placeholder='' />
                                    </Col>
                                </Row>

                            </div>
                            <div className='col-md-6 p-2'>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="color_code" >Color for This Work</label>
                                        </div>
                                        <Field type="text" className="form-control " name="color_code" placeholder='' />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="comp_seq" >Your Sequence no for Company</label>
                                        </div>
                                        <Field type="text" className="form-control " name="comp_seq" placeholder='' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-1 ">
                                        <div className='d-flex justify-content-start'>
                                            <label htmlFor="company_code" >Your code for company</label>
                                        </div>
                                        <Field type="text" className="form-control " name="company_code" placeholder='' />
                                    </Col>
                                </Row>

                                <div className='d-flex justify-content-center align-items-center  p-5'>
                                    <Button type="reset" className='btn btn-warning btn-sm mx-2' onClick={() => { resetForm(); setInitialValues({}) }}>Reset</Button>

                                    <Button type='submit' className='btn btn-sm' >Submit</Button>



                                </div>
                            </div>

                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default WorkedProjectsEntry