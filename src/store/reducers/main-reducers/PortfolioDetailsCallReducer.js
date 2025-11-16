const initialValues = null

export const PortfolioDetailsCallReducer = (state = initialValues, action) => {
    switch (action.type) {
        case 'PORTFOLIO_DETAILS_CALL':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
