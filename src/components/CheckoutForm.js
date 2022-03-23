import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Alert, Button, Row } from "react-bootstrap";
import axios from "axios";
import history from "../history";

const totalPrice = 1400; // this means 12 usd and it should be calculated from the items or in the backend

export const CheckoutForm = (props) => {
  const [paymentError, setPaymentError] = useState(false)
  const [paymentErrorMsg, setPaymentErrorMsg] = useState("")
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);

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
    props.sendData("lol");
    console.log(props.order.totalCost);
    axios
      .post("http://localhost:8000/create-payment-intent", {
        price: props.order.totalCost.toString().replace(".", ""),
      })
      .then((res) => {
        if (res.data.msg == "error") {
          console.log("error on payment");
          return;
        }
        stripe
          .confirmCardPayment(res.data.clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: props.order.name,
              },
            },
            receipt_email: props.order.email,
          })
          .then(r => {
            if(r.hasOwnProperty('error')){     // => true){
              if (r.error.message == "Your card number is invalid.") {
                console.log("Your card number is invalid.");
                setPaymentError(true)
                setPaymentErrorMsg("Your card number is invalid.")
                return;
              }
              else{
                console.log("error: ", r.error);
                setPaymentError(true)
                setPaymentErrorMsg(r.error.code)
                console.log(r.error.code)
                return;
              }
            }
            console.log("confirm Card Payment: ", r);
            setPaymentError(false)
            setPaymentErrorMsg("")
            axios
              .post("http://localhost:8000/placeOrder", props.order)
              .then((res) => {
                console.log(res);
                if(res.data.msg == "success"){
                history.push({
                pathname: "/orderConfirmation",
                state: props.order
                })
              }
                else{
                  console.log("here????")
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log("err in confirm card payment", err);
            return err;
          });
      });
  };
  return (
  
    <form id="payment-form" onSubmit={handleSubmit}>
        <Alert show={paymentError} variant="danger">
      {paymentErrorMsg}
    </Alert>
      <CardElement id="card-element" onChange={handleChange} />
      <div style={{ height: "10px" }} />
      <p style={{display: "inline-block"}}>${props.order.totalCost}</p>
      <Button
        id={"placeOrderButton"}
        disabled={succeeded}
        onClick={handleSubmit}
        style={{marginLeft: '18px'}}
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
