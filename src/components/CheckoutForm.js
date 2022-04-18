import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Alert, Button, Spinner, Modal } from "react-bootstrap";
import axios from "axios";
import history from "../history";
import "../css/CheckoutForm.css"
export const CheckoutForm = (props) => {
  const [paymentError, setPaymentError] = useState(false);
  const [paymentErrorMsg, setPaymentErrorMsg] = useState("");
  const [succeeded] = useState(false);
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe();
  const elements = useElements();

  // handle input errors
  const handleChange = async (event) => {
    console.log(event.error)
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const url = "https://34.229.165.152:8080/"
    console.log("handle submit")
    if(!stripe || !elements) return
    props.validation()
    if(!props.ready){
      console.log("not ready")
      // props.promptError()
      return
    }
    setProcessing(true)

    axios
      .post(url + "create-payment-intent", {
        price: props.order.totalCost.toString().replace(".", ""),
      })
      .then((res) => {
        if (res.data.msg === "error") {
          console.log("error on payment");
          setPaymentError(true);
          setPaymentErrorMsg("error on payment");
          setProcessing(false)
          return;
        }
        console.log(res.data)
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
          .then((r) => {
            if (r.hasOwnProperty("error")) {
              // => true){
              if (r.error.message === "Your card number is invalid.") {
                setProcessing(false)
                setPaymentError(true);
                setPaymentErrorMsg("Your card number is invalid.");
                return;
              } else {
                setProcessing(false)
                setPaymentError(true);
                setPaymentErrorMsg(r.error.code);
                return;
              }
            }
            setPaymentError(false);
            setPaymentErrorMsg("");
            axios
              .post(url + "placeOrder", props.order)
              .then((res) => {
                if (res.data.msg === "success") {
                  setProcessing(false)
                  history.push({
                    pathname: "/orderConfirmation",
                    state: props.order,
                  });
                } else {
                  setProcessing(false)
                  console.log("here????");
                }
              })
              .catch((err) => {
                setProcessing(false)
                setPaymentError(true);
                setPaymentErrorMsg("error");
                console.log(err);
              });
          })
          .catch((err) => {
            console.log("err in confirm card payment", err);
            setPaymentError(true);
            setPaymentErrorMsg("Error");
            setProcessing(false)
            return err;
          });
      })
      .catch(err => {
         console.log("err: " + err)
          setPaymentError(true);
            setPaymentErrorMsg("Error");
            setProcessing(false)
      });
  };


  return (
    <form id="payment-form" onSubmit={handleSubmit}>
       <Modal show={processing} centered className="noBackground">
       <div className="d-flex justify-content-center">
         <Spinner animation="border" variant="info" style={{width: "5rem"
    , height: "5rem"}}></Spinner></div></Modal>
      <Alert show={paymentError} variant="danger">
        {paymentErrorMsg}
      </Alert>
      <CardElement id="card-element" onChange={handleChange} />
      <div style={{ height: "10px" }} />
      <p style={{ display: "inline-block" }}>${props.order.totalCost}</p>
      <Button
        id={"placeOrderButton"}
        disabled={succeeded}
        onClick={handleSubmit}
        style={{ marginLeft: "18px" }}
      >
        Place Order
      </Button>
    </form>
  );
};
