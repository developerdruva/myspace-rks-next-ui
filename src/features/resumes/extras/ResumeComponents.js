import { Bs0Circle, BsArrowRight, BsDot } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";
import { RiCircleFill } from "react-icons/ri";

export const experience = (workedCompanies, workedProjects, fieldProps, themeModeFrmRdx = true) => {
    return <div className={''}>
        {
            workedCompanies?.map((comp, compIndex) => {
                return <article className={`m-0 mt-0`} key={compIndex}>
                    <div className={``}                            >
                        <div className='d-flex justify-content-between m-0 p-0'>
                            <div style={{ color: themeModeFrmRdx ? 'black' : 'steelblue', fontSize: fieldProps?.fsSubheads }}>{comp?.company_name}
                                <span className='m-0 p-2' style={{ fontSize: fieldProps?.fsNormal }}>({comp?.designation})</span>
                            </div>
                            <span style={{ fontSize: fieldProps?.fsNormal }}>{comp?.from_date} to {comp?.to_date}</span>
                        </div>
                        <ol reversed type='I'>
                            {
                                workedProjects?.filter(item => item?.company_code === comp?.company_code)?.map((item, index) => {
                                    let responsibilitesOfProject = item?.responsibilities?.split('.');
                                    return (
                                        <li key={index} className={`m-0 p-0`} style={{ fontSize: fieldProps?.fsSmall }}>
                                            <div className='d-flex justify-content-between fw-bold m-1'>{item?.project_name}
                                                <div className={`fw-normal`}>
                                                    Role:<span> {item?.role_name?.split('(')[0]}</span>
                                                </div>
                                                <div className={`fw-normal`}>
                                                    Client:<span> {index === 0 ? item?.client_name?.split(' ')[8] : item?.client_name}</span>
                                                </div>
                                            </div>
                                            {/* <div className={` d-flex justify-content-start m-1`}>Description </div> */}
                                            {
                                                compIndex === 0 ?
                                                    <div className={` d-flex justify-content-start m-1`}>
                                                        <div className={``}>
                                                            {
                                                                responsibilitesOfProject?.map((res, resIndex) => (
                                                                    (res != ' ' && res != '') &&
                                                                    <div key={resIndex} className={``} style={{ textAlign: 'left' }}>{'>'}&nbsp;{res}.</div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    : <div className={` d-flex justify-content-start m-1`}>
                                                        <p className="m-0 p-0" align='justify' style={{ fontSize: fieldProps?.fsSmall }}>
                                                            {item?.project_desc}
                                                        </p>
                                                    </div>

                                            }

                                        </li>
                                    )
                                })
                            }
                        </ol>
                    </div>
                </article>
            })
        }
    </div>
}

export const getPocProjects = (pocProjects, fieldProps) => {
    return <ul type="circle">
        {
            pocProjects?.map((pocItem, pocIndex) => {
                return <div>
                    <li className="m-0 p-0" style={{ fontSize: fieldProps?.fsNormal }}>

                        <p className=' m-0 p-0' align='justify' style={{ fontSize: fieldProps?.fsNormal }}>
                            {pocItem?.title} &nbsp;
                            <span className='' >
                                ({pocItem?.project_type})
                            </span> &nbsp;
                            <span>
                                <a href={pocItem?.project_url} className="text-decoration-none" target="_blank">View</a>
                            </span>
                        </p>

                    </li>
                    <div className="m-0" align='justify' style={{fontSize:fieldProps?.fsSmall}}>
                        {pocItem?.project_desc}
                    </div>
                </div>
            })
        }
    </ul>
}

{
    /*
    {
                    workedCompanies?.map((comp, compIndex) => {
                        return <article className={`m-0 mt-2`} key={compIndex}>
                            <div className={``} style={{ backgroundColor: comp?.color_code }}>
                                <MdWork style={{ color: themeModeFrmRdx ? 'darkslategrey' : 'purple' }} />
                            </div> 
                            <div className={``}
                            // style={{ backgroundColor: themeModeFrmRdx ? '#f2f3f7' : '#1B2631', color: themeModeFrmRdx ? 'black' : 'lightblue' }}
                            >
                                <div className='d-flex justify-content-between m-0 p-0'>
                                    <div style={{ color: themeModeFrmRdx ? 'black' : 'steelblue', fontSize: fieldProps?.fsNormal }}>{comp?.company_name} </div>
                                    <span style={{fontSize: fieldProps?.fsSmall}}>{comp?.from_date} to {comp?.to_date}</span>
                                </div>
                                <div className='d-flex justify-content-start m-0 p-0' style={{fontSize: fieldProps?.fsSmall}}>{comp?.designation}</div>
                                <ol reversed type='I' prefix=''>
                                    {
                                        workedProjects?.filter(item => item?.company_code === comp?.company_code)?.map((item, index) => {
                                            let responsibilitesOfProject = item?.responsibilities?.split('.');
                                            return (
                                                <li key={index} className={``} >
                                                    <div className='d-flex justify-content-start fw-bold m-1'>{item?.project_name}</div>
                                                    <div className='d-flex justify-content-between m-1'>
                                                        <div className={``}>
                                                            Client:<span> {item?.client_name}</span>
                                                        </div>
                                                        <div className={``}>
                                                            Role:<span> {item?.role_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className={` d-flex justify-content-start m-1`}>Description </div>
                                                    <div className={`d-flex justify-content-start m-1 `}>
                                                        <p className='text-left m-0' align='justify'>
                                                            {item?.project_desc}
                                                        </p>
                                                    </div>
                                                    <div className={` d-flex justify-content-start m-1`}>Responsibilities </div>
                                                    <div className={` d-flex justify-content-start m-1`}>
                                                        <ul className={``}>
                                                            {
                                                                responsibilitesOfProject?.map((res, resIndex) => (
                                                                    (res != ' ' && res != '') &&
                                                                    <li key={resIndex} className={``} style={{ textAlign: 'left' }}>{res}</li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ol> 
                            </div>

                        </article>
                    })
                }
    */
}