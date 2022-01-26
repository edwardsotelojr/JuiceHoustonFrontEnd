import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {Button, Row} from 'react-bootstrap'
import axios from 'axios'
import history from "../history";

const totalPrice = 1400; // this means 12 usd and it should be calculated from the items or in the backend

export const CheckoutForm = (props) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  console.log(props.order);


  // handle input errors
  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };


  const handleSubmit = async (ev) => {
    ev.preventDefault();
    props.sendData("lol")
    axios
    .post("http://localhost:8000/create-payment-intent", {
      price: parseInt(
        props.order.totalCost
          .toFixed(2)
          .toString()
          .replace(".", "")
      ),
    })
    .then((res) => {
      console.log("res: ", res);
        setProcessing(true);
        const payload = stripe.confirmCardPayment(res.data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: props.order.name,
            },
          },
          receipt_email: props.order.email,

        });
        if (payload.error) {
          setError(`Payment failed ${payload.error.message}`);
          setProcessing(false);
        } else {
          axios.post('http://localhost:8000/placeOrder', props.order).then(res => 
          {console.log(res)
            history.push({
              pathname: "/orderConfirmation",
              state: res.data
            });  
          }
          )
          setError(null);
          setProcessing(false);
          setSucceeded(true);
      }
    })
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        onChange={handleChange}
      />
      <div style={{height: "10px"}}/>
      <Button
        id={"placeOrderButton"}
        disabled={processing || disabled || succeeded}
        onClick={handleSubmit}
      >
        Place Order
      </Button>
      {/*error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )*/}
    </form>
  );
};
