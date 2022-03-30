import React, {useEffect, useState} from 'react';
import './payment-component.styles.css';
import { Helmet } from 'react-helmet';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import { motion } from 'framer-motion';
import ProgressProvider from '../utils/ProgressPrvider';
import { connect } from 'react-redux';
import { setPaymentOptions } from '../../redux/payment/payment.reducer.actions';
import NumberFormat  from 'react-number-format';

// import './index'


const PaymentOption = ({history, setOptions}) => {

    const [data, setData] = useState({
       status: '',
       request_amount: '',
       monthly_earning: '',
       payment_plan: ''

    })

    const hanldeChange = event => {
        // setData({
            data[[event.target.name]] = event.target.value
        // })
        // console.log(data)
    }



    const percentage = 35;

    const handleSubmit = event => {
        event.preventDefault();
        setOptions(data)
        history.push('/payment-breakdown');
    }

    return (
        <motion.div
            initial={{translateX: 50}}
            animate={{translateX: 0}}
            exit={{translateX: -50, opacity: 0}}
            transition={{duration: 0.5}}
        
        >
                <div className="payment-option-container move">
                <div className="payment-option-section"></div>
                <div className="payment-option-section two">
                    <p className="my-rent">My Rent</p>
                    <div className="payment-option-section-two-inner-section">
                        <div className="sec-one">
                            <div className="payment-option">Payment Option</div>
                            <div className="indicator">
                                    <div className="one">1 of 3</div>
                                    <div className="inner-box-2">
                                        <ProgressProvider valueStart={10} valueEnd={percentage}>
                                            {value =>
                                            
                                                <CircularProgressbar 
                                                    styles={buildStyles({
                                                        pathColor: `rgba(12, 185, 41, 1)`
                                                    })}
                                                    strokeLinecap={"butt"}
                                                    strokeWidth={15}
                                                    value={value} 
                                                    // text={`${value}%`} 
                                                />
                                            }
                                        </ProgressProvider>
                                    </div>
                                    
                            </div>
                        </div>
                        <div className="sec-two">
                            <form onSubmit={handleSubmit}>
                          
                                <p className="details">What's your accommodation status?</p>
                                <div className="custom-radio">
                                    
                                                <label>
                                                        
                                                        <input type="radio" required onChange={hanldeChange} name="status" value="looking" id="looking"/>
                                                        <p className="custom-radio-btn-parent">
                                                            Looking to renew my rent
                                                        </p>

                                                </label>
                                                <label>
                                                        <input type="radio" required onChange={hanldeChange} name="status" value="pay" id="pay"/>
                                                        <p className="custom-radio-btn-parent">
                                                            Want to pay for a new place
                                                        </p>
                                                </label>
                                                <label>
                                                        <input type="radio" required onChange={hanldeChange} name="status" value="searching" id="searching"/>
                                                        <p className="custom-radio-btn-parent">
                                                            I'm still searching
                                                        </p>
                                                </label> 
                                </div>
                                                                                                                
                                    <p className="details">How much is your rent request amount?</p>
                                        <input type="text" required onChange={hanldeChange} name="request_amount" placeholder="Amount" className="request"/>

                                    <p className="details">How much do you earn monthly?</p>
                                        <input onChange={hanldeChange} required type="text" name="monthly_earning" placeholder="Amount" className="monthly-earning"/>

                                    <p className="details">Choose a monthly payment plan</p>
                                    <div className="custom-select">
                                            <select onChange={hanldeChange} required name="payment_plan" className="payment-plan">
                                                <option className="options" value="1 month">1 Month</option>
                                                <option value="2 month">2 Month</option>
                                                <option value="3 month">3 Month</option>
                                                <option value="4 month">4 Month</option>
                                            </select>
                                    </div>
                                    <input type="submit" value="NEXT" className="submit"/>
                                                            
                            </form>
                            
                        </div>
                    </div>
                </div>
                <div className="payment-option-section"></div>
                
                </div>
        </motion.div>
    )
}

const mapDispatchToProps = dispatch => ({
    setOptions: options => dispatch(setPaymentOptions(options))
})

export default connect(null, mapDispatchToProps)(PaymentOption);