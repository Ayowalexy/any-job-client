import React, {useState, useEffect} from 'react';
import './payment-breakdown.styles.css';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import NumberFormat  from 'react-number-format';
import axios from 'axios';
import { setSuccess } from '../../redux/payment/payment.reducer.actions';
import { FaInfoCircle } from 'react-icons/fa'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const PaymentBreakdown = ({history,location, options, setState}) => {
    const [data, setData] = useState({
        request_amount: options.paymentOption.request_amount,
        payment_plan: options.paymentOption.payment_plan || "1"
 
     })

     const [clicked, setClicked] = useState(false);
     const [formattedValue, setFormattedValue] = useState(location.state.formattedValue);
     const [value, setValue] = useState(location.state.value);

     console.log(location)
     const [d, setD] = useState(options.paymentOption.request_amount);
     const [d2, setD2] = useState(options.paymentOption.payment_plan);

     const hanldeSubmit = async event => {
         event.preventDefault();

         const { paymentOption } = options
         console.log(paymentOption)
        //  http://localhost:3000/
        // https://any-job-server.herokuapp.com
         await axios.post('https://any-job-server.herokuapp.com/payment-option', {
             paymentOption
         })
            .then(res => {
                if(res.data.message === "ok"){
                    setState({success: true})
                    history.push('/')
                }
            })
            .catch(e => console.log(e))

     }

     const hanldeChange = (value, name) => {
                data[name] = value;
    }

    const handleClick = event => {
        setClicked(true);
        // event.target.classList
    }
  

    const DisplayOptions = (payment_plan) => {
            const arr = []
            for(let i = 1; i <= 12; i++){ 
                arr.push(<option key={i} selected={payment_plan === i.toString()  ? true : false} value={`${i}`}>{`${i} Months`}</option>)
            }
            return arr
    }

    
    return (
        <motion.div
        initial={{translateX: 50}}
        animate={{translateX: 0}}
        exit={{translateX: 0}}
        transition={{duration: 0.5}}
        
        >
                <div className="payment-option-container move">
                <div className="payment-option-section"></div>
                <div className="payment-option-section three">
                    <p className="my-rent">My Rent</p>
                    <div className="payment-option-section-two-inner-section">
                        <div className="sec-one">
                            <div className="payment-option opt">Payment Breakdown</div>
                            <div className="indicator"></div>
                        </div>
                        <div className="sec-two">
                            <form onSubmit={hanldeSubmit}>
                                        <p className="details">Rent Request amount</p>         
                                        <label className="label-amount">
                                            <p>Amount</p>
                                        </label>    
                                        <NumberFormat 
                                            required
                                            className="custom-radio-btn-parent value"
                                            value={data['request_amount']}
                                            thousandSeparator={true}
                                            name="request_amount"
                                            prefix={"₦"}
                                            onValueChange={(values, sourceInfo) => {
                                                hanldeChange(values.value, sourceInfo.event.target.name)
                                                setFormattedValue(values.formattedValue)
                                                setValue(values.value);
                                            }}
                                        />                  
                                        {/* <input className="custom-radio-btn-parent value" 
                                        onChange={hanldeChange} type="text" name="request_amount" placeholder={`#${options.paymentOption.request_amount}`}/> */}
                                    <p className="details">Monthly payment plan</p>
                                    <select name="payment_plan" onChange={(event) => {
                                                    hanldeChange(event.target.value, event.target.name)
                                                    setData({
                                                        payment_plan: event.target.value
                                                    })
                                                }} className="payment-plan" id="">
                                        {
                                            DisplayOptions(options.paymentOption.payment_plan)
                                        }
                                    </select>

                                   <div className="pay-options">
                                       <div>
                                            <p className="details">Payment option</p>
                                       </div>
                                       <div>
                                           <Popup 
                                            contentStyle={{
                                                width: '270px',
                                                padding: '20px',
                                                fontSize: '15px',
                                                border: '1px solid black'
                                            }}
                                            trigger={<div><FaInfoCircle/></div>}
                                            position= 'left center'
                                            // className={'trigger'}

                                           >
                                               <div className="my-popup">
                                                   <p>
                                                    Kwaba pre-approval page shows the amount amount renters
                                                    can get from our service.
                                                   </p>

                                                  <p>
                                                        The monthly payment is calculated by adding 2% of the 
                                                        pre-approved amount to the pre-approved amount and spread
                                                        over the selected monthly payment plan.
                                                  </p>
                                               </div>

                                           </Popup>
                                       </div>
                                   </div>

                                    <div className="confirm">
                                        <div className="confirm_one">
                                            <div>Pre-approved amount</div>
                                            <div>{
                                                    formattedValue
                                                }</div>
                                        </div>
                                        <div className="confirm_one">
                                            <div>Monthly payment</div>
                                            <div>
                                            <NumberFormat 
                                            displayType={'text'}

                                            // value={Math.ceil((((0.02 * Number(value)) * Number(data['payment_plan']))) + Number(value) / Number(data['payment_plan']))}
                                            value={Math.ceil( ( ( (0.02 * Number(value)) * (Number(data['payment_plan'])) ) + ( Number(value)) ) / Number(data['payment_plan']) )}
                                            thousandSeparator={true}
                                            name="request_amount"
                                            prefix={"₦"}
                                            renderText={(value, props) => <div {...props}>{value}</div>}
                                        />   
                                                
                                                </div>
                                        </div>
                                        <div className="confirm_one">
                                            <div>Tenor</div>
                                            <div>{data['payment_plan']} Months</div>
                                        </div>
                                    </div>
                                        <button onClick={handleClick} className={`accept ${clicked ? 'loader' : null}`}>
                                                {
                                                    clicked ? 'Loading' : 'ACCEPT'
                                                }
                                        </button>

                                    <Helmet>
                                        {/* <script src="./index.js" type="text/javascript" /> */}
                                    </Helmet>                            
                            </form>
                            
                        </div>
                    </div>
                </div>
                <div className="payment-option-section"></div>
                
                </div>
        </motion.div>
    )
}

const mapStateToProps = state => ({
    options: state.options
})

const mapDispatchToProps = dispatch => ({
    setState: state => dispatch(setSuccess(state))
})


export default connect(mapStateToProps, mapDispatchToProps)(PaymentBreakdown);