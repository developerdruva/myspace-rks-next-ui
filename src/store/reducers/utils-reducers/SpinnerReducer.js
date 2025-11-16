const initialValues = {
    showSpinner: false
}
export const SpinnerReducer = (state = initialValues, action) => {
    switch (action.type) {
        case 'SHOW_SPINNER':
            return {
                ...state,
                showSpinner: true
            }
        case 'HIDE_SPINNER':
            return {
                ...state,
                showSpinner: false
            }
        default:
            return state
    }
}