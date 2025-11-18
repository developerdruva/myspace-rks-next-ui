const initialValues = {
    fsSmall: '10px',
    fsNormal: '12px',
    fsPara: '11px',
    fsHeadings: '18px',
    fsSubHeads: '14px',
    fsTitles: '40px',
    fsSubTitles: '20px'
}

export const FieldPropsReducer = (state = initialValues, action) => {
    switch (action.type) {
        case 'FIELD_PROPS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}