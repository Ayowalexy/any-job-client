const INITIAL_STATE = {
    paymentOption: {},
    success: false
}

const paymentReducer =  (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_PAYMENT_OPTIONS':
            return {
                ...state,
                paymentOption: action.payload
            }

        case 'SET_SUCCESS':
            return {
                ...state,
                success: action.payload
            }

        default: return state
    }
}

export default paymentReducer;