const initialValues = null

export const PortfolioReducer = (state = initialValues, action) => {
    switch (action.type) {
        case 'PORTFOLIO_DETAILS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

// {
//     certifications: '',
//     personDetails: '',
//     pocProjects: '',
//     skillSet: '',
//     summaryEducation: '',
//     workedCompanies: '',
//     workedProjects: '',
//     skillsKeys:''
// }