import React, {useEffect, useState} from 'react';
import './payment-component.styles.css';
import { Helmet } from 'react-helmet';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import { motion } from 'framer-motion';
import ProgressProvider from '../utils/ProgressPrvider';
import { connect } from 'react-redux';
import { setPaymentOptions, setSuccess } from '../../redux/payment/payment.reducer.actions';
import NumberFormat  from 'react-number-format';
import SuccessAnimation from '../success-animation/success-animation.component';

// import './index'


const PaymentOption = ({history, location, setOptions, success = {}, setState}) => {

    const [formattedValue, setFormattedValue] = useState(0);
    const [value, setValue] = useState(0)
    const [data, setData] = useState({
       status: '',
       request_amount: '',
       monthly_earning: '',
       payment_plan: ''

    })

    const { state = {} } = location;

    const [show, setShow] = useState(Object.keys(state).includes('success'));
    const hanldeChange = (value, name) => {
        // setData({
            // data[[event.target.name]] = event.target.value
            data[name] = value;
        // })

    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            success.success ? setState({success:false}) : console.log('')
        }, 3000)
    }, [show])


    const percentage = 35;

    const handleSubmit = event => {
        event.preventDefault();
        setOptions(data)
        history.push('/payment-breakdown', {
            formattedValue, value
        });
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

                    {
                        success.success ? <SuccessAnimation /> : null
                    }
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
                                                        
                                                        <input type="radio" 
                                                            required 
                                                            onChange={(event) => {
                                                                                    hanldeChange(event.target.value, event.target.name)
                                                                                }} 
                                                            name="status" 
                                                            value="looking" 
                                                            id="looking"
                                                        />
                                                        <p className="custom-radio-btn-parent">
                                                            Looking to renew my rent
                                                        </p>

                                                </label>
                                                <label>
                                                        <input type="radio" 
                                                            required 
                                                            onChange={(event) => {
                                                                                    hanldeChange(event.target.value, event.target.name)
                                                                                }} 
                                                            name="status"
                                                            value="pay" 
                                                            id="pay"
                                                        />
                                                        <p className="custom-radio-btn-parent">
                                                            Want to pay for a new place
                                                        </p>
                                                </label>
                                                <label>
                                                        <input type="radio" 
                                                            required onChange={(event) => {
                                                                                    hanldeChange(event.target.value, event.target.name)
                                                                                }} 
                                                            name="status" 
                                                            value="searching" 
                                                            id="searching"
                                                        />
                                                        <p className="custom-radio-btn-parent">
                                                            I'm still searching
                                                        </p>
                                                </label> 
                                </div>
                                                                                                                
                                    <p className="details">How much is your rent request amount?</p>
                                        <NumberFormat 
                                            required
                                            className="request"
                                            value={data['request_amount']}
                                            placeholder="Amount"
                                            thousandSeparator={true}
                                            name="request_amount"
                                            prefix={"₦"}
                                            onValueChange={(values, sourceInfo) => {
                                                hanldeChange(values.value, sourceInfo.event.target.name)
                                                setFormattedValue(values.formattedValue);
                                                setValue(values.value)
                                            }}
                                        />
                                        {/* <input type="text" required onChange={hanldeChange} name="request_amount" placeholder="Amount" className="request"/> */}

                                    <p className="details">How much do you earn monthly?</p>
                                    <NumberFormat 
                                            required
                                            className="monthly-earning"
                                            value={data['monthly_earning']}
                                            placeholder="Amount"
                                            thousandSeparator={true}
                                            name="monthly_earning"
                                            prefix={"₦"}
                                            onValueChange={(values, sourceInfo) => {
                                                hanldeChange(values.value, sourceInfo.event.target.name)
                                            }}
                                        />
                                        {/* <input onChange={hanldeChange} required type="text" name="monthly_earning" placeholder="Amount" className="monthly-earning"/> */}

                                    <p className="details">Choose a monthly payment plan</p>
                                    <div className="custom-select">
                                            <select onChange={(event) => {
                                                hanldeChange(event.target.value, event.target.name)
                                            }} required name="payment_plan" className="payment-plan">
                                                <option selected value="1">1 Month</option>
                                                <option value="2">2 Month</option>
                                                <option value="3">3 Months</option>
                                                <option value="4">4 Months</option>
                                                <option value="5">5 Months</option>
                                                <option value="6">6 Months</option>
                                                <option value="7">7 Months</option>
                                                <option value="8">8 Months</option>
                                                <option value="9">9 Months</option>
                                                <option value="10">10 Months</option>
                                                <option value="11">11 Months</option>
                                                <option value="12">12 Months</option>
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

const mapStateToProps = ({ options: {success}}) => ({
    success
})

const mapDispatchToProps = dispatch => ({
    setOptions: options => dispatch(setPaymentOptions(options)),
    setState: state => dispatch(setSuccess(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOption);