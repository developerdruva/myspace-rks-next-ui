<table className='table table-hover table-striped table-bordered' style={{ fontSize: '0.7rem' }}>
                                <thead>
                                    <tr>
                                        {
                                            docsFormInputs?.map((item, index) => {
                                                return <td key={index}>
                                                    {item?.field_label}
                                                </td>
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {
                                            docsFormInputs?.map((item, index) => {
                                                if (item?.input_type == 'normal') {
                                                    return <td>
                                                        <Field type={item?.field_type} name={item?.key_name}
                                                            onChange={(e) => { handleChange(e) }}
                                                            className={`${themeMode ? '' : 'bg-secondary'} ${item?.field_styles}`}
                                                        />
                                                    </td>
                                                }
                                            })
                                        }
                                    </tr>

                                </tbody>
                                {/* <Field type={'text'} name={'partName'}
                                onChange={(e) => { handleChange(e) }}
                                className={`${themeMode ? '' : 'bg-secondary'} form-control`}
                            /> */}

                            </table>