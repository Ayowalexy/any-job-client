import React, {useState, useEffect} from 'react';
import './payment-breakdown.styles.css';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import axios from 'axios';


const PaymentBreakdown = ({history, options}) => {
    const [data, setData] = useState({
        request_amount: options.paymentOption.request_amount,
        payment_plan: ''
 
     })
     const [d, setD] = useState(options.paymentOption.request_amount);
     const [d2, setD2] = useState(options.paymentOption.payment_plan);

     const hanldeSubmit = async event => {
         event.preventDefault();

         const { paymentOption } = options
         console.log(paymentOption)
         await axios.post('https://any-job.herokuapp.com/payment-option', {
             paymentOption
         })
            .then(res => {
                if(res.data.message === "ok"){
                    history.push('/')
                }
            })
            .catch(e => console.log(e))

     }

     const hanldeChange = event => {
        // setData({
            data[[event.target.name]] = event.target.value
        // })
            // if(/[0-9]/.test(event.target.value)){
                event.preventDefault();
                console.log('num')

        // }
        setD(event.target.value)
        setD2(event.target.value)

        console.log(d)

    }

    useEffect(() => {

    }, [data.request_amount])

    const DisplayOptions = (payment_plan) => {
            const arr = []
            for(let i = 1; i < 12; i++){ 
                arr.push(<option key={i} selected={payment_plan.includes(i.toString()) ? true : false} value={`${i} Months`}>{`${i} Months`}</option>)
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
                            <div className="payment-option">Payment Breakdown</div>
                            <div className="indicator"></div>
                        </div>
                        <div className="sec-two">
                            <form onSubmit={hanldeSubmit}>
                                        <p className="details">Rent Request amount</p>         
                                        <label className="label-amount">
                                            <p>Amount</p>
                                        </label>                      
                                        <input className="custom-radio-btn-parent value" 
                                        onChange={hanldeChange} type="text" name="request_amount" placeholder={`#${options.paymentOption.request_amount}`}/>
                                    <p className="details">Monthly payment plan</p>
                                    <select name="payment_plan" onChange={hanldeChange} className="payment-plan" id="">
                                        {
                                            DisplayOptions(options.paymentOption.payment_plan)
                                        }
                                    </select>

                                    <p className="details">Payment option</p>
                                    <div className="confirm">
                                        <div className="confirm_one">
                                            <div>Pre-approved amount</div>
                                            <div>#{d}</div>
                                        </div>
                                        <div className="confirm_one">
                                            <div>Monthly payment</div>
                                            <div>#{
            
                                                    d.includes(7) ?
                                                    `${Math.ceil((((Number(d.split(',')[0].concat([d.split(',')[1]])) * 0.02) * Number(d2.split(' ')[0]) + Number(d.split(',')[0].concat([d.split(',')[1]])))) / Number(d2.split(' ')[0]))}`
                                                    :
                                                    `${Math.ceil((((Number(d) * 0.02) * Number(d2) + Number(d))) / Number(d2))}`
                                                }</div>
                                        </div>
                                        <div className="confirm_one">
                                            <div>Tenor</div>
                                            <div>{d2}</div>
                                        </div>
                                    </div>
                                    <input type="submit" value="ACCEPT" className="accept"/>
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


export default connect(mapStateToProps)(PaymentBreakdown);