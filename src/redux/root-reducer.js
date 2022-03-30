import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import paymentReducer from './payment/payment.reducer';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['options']
}


const rootReducer = combineReducers({
    options: paymentReducer
})

export default persistReducer(persistConfig, rootReducer)