import '../css/Payment.css'
import React, { useContext } from 'react'
import { useState, useRef, useEffect} from "react";
import {DataContext} from '../Context'
import { useElements, CardElement, useStripe } from '@stripe/react-stripe-js';
import BuyerInfoForm from './BuyerInfoForm';
import axios from 'axios';
import {ToastContainer, toast, Zoom, Bounce} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
const API = 'http://localhost:5000';



function Payment (props){

        const {total, cart,captureOrder, clearCart} = useContext(DataContext);
        const stripe = useStripe();
        const elements = useElements();
        const [paymentMethod, setPaymentMethod] = useState(null)
        const [paymentIntent, setPaymentIntent] = useState(null);
        const [error, setError] = useState(false);
        const [orderId, setOrderId] = useState("");
        const paypalRef = useRef();

        const setAndToastError = (error) => {
          toast.error(error)
          setError(error)
        }
        useEffect(() => {
          console.log(total)
          window.paypal
            .Buttons({
              fundingSource: window.paypal.FUNDING.PAYPAL,
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: cart.items,
                      amount: {
                        currency_code: 'EUR',
                        value: total,
                      },
                    },
                  ],
                });
              },
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                if(order.status === 'COMPLETED'){
                  const result = await captureOrder(order.purchase_units[0].payments.captures[0].id, 'paypal')
                  clearCart();
                  setOrderId(result.data.id)
                }
                
                
              },
              onError: err => {
                setAndToastError(err);
                console.error(err);
              },
              onCancel:  () =>{
                setAndToastError("Mokėjimas buvo nutrauktas")
              }
            })
            .render(paypalRef.current);
        }, []);

        const createPaymentIntent = async (event)=>{
            const amount = (total*100).toFixed(0);
            await axios.post(API+ "/createpaymentintent", {
                amount: amount
            })
            .then(response => {
            setPaymentIntent(response.data)
            })
            
        }

        const handleStripeSubmit = async () => {
            const cardElement = elements.getElement(CardElement);
        
            // Confirm Card Payment
            const {
              paymentIntent: updatedPaymentIntent,
              error,
            } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
              payment_method: { card: cardElement },
            });
        
            if (error) {
              setAndToastError(error.message);
              error.payment_intent && setPaymentIntent(error.payment_intent);
            } else {
              setPaymentIntent(updatedPaymentIntent);
              const result = await captureOrder(paymentIntent.id, 'stripe')
              setOrderId(result.data.id)
              clearCart()
              }
            }
        const creditCard = () => {
          createPaymentIntent();
          setPaymentMethod('card');
        }

       
        //cardElement field params
        //could be adjusted 
        const CardElementOptions = {
          style: {
            base: {
              fontWeight: '500',
              fontSize: '20px',
              fontSmoothing: 'antialiased',
            },
            
          },
          hidePostalCode: true
        }
        if (orderId==="")
        return (
          
            <div id = "payment">
              {error &&<ToastContainer
                  draggable={false}
                  transition={Zoom}
                  position = {toast.POSITION.TOP_RIGHT}
                  limit = {3}
                  autoClose={4000}/>}
                
                <BuyerInfoForm/>
                {paymentMethod==null &&
                <><button 
                className = "paywithcard"
                onClick={creditCard}>
                  Kreditinė</button>
                  <div className = "paypalbutton"ref={paypalRef} /> <h3 className ="total">Užsakymo suma: €{total} </h3> </>}

                  {paymentMethod==='card'&& <>
                  <CardElement
                  className = "cardinfo"
                  options = {CardElementOptions}
                  />  
                  <button
                  
                className="stripeSubmit"
                onClick={handleStripeSubmit}
                >Mokėti €{total}</button><></></>
                  }
                  </div>
                  
        );
        else
        return (
          <h1>Ačiū už pateiktą užsakymą. Jūsų užsakymo numeris: {orderId}</h1>
        );
    };  
  

export default Payment