const INITIAL_STATE = {
    paymentOption: {}
}

const paymentReducer =  (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_PAYMENT_OPTIONS':
            console.log(action.payload)
            return {
                ...state,
                paymentOption: action.payload
            }
        default: return state
    }
}

export default paymentReducer;