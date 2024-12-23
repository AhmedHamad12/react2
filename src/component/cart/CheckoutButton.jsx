import React from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QItJQA0QYODoXsrjxjIngPprDXyFSqdcBin4GvlQ4kI49rjH2B8eXbSuqizaYGutNYmMu0mqfR3yu7Pb3wbFbHy00eqa0H3Sw");

const CheckoutButton = ({ cartItems, clearCart }) => {
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const params = new URLSearchParams();
      params.append("payment_method_types[]", "card");
      params.append("mode", "payment");
      params.append("success_url", `${window.location.origin}/success`);
      params.append("cancel_url", `${window.location.origin}/cart`);
      cartItems.forEach((item, index) => {
        params.append(`line_items[${index}][price_data][currency]`, "usd");
        params.append(`line_items[${index}][price_data][product_data][name]`, item.name);
        params.append(`line_items[${index}][price_data][unit_amount]`, item.price * 100);
        params.append(`line_items[${index}][quantity]`, item.quantity);
      });
      params.append("allow_promotion_codes", "true");

      const response = await axios.post(
        "https://api.stripe.com/v1/checkout/sessions",
        params,
        {
          headers: {
            Authorization: `Bearer sk_test_51QItJQA0QYODoXsrnrsKL09pPq35o9GEZclw8bWV5PhQ1FYDb8Fp9Fylqoxox8badc89WmUigu7zzHpOhNi16zRU00FaxeCk7K`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const sessionId = response.data.id;
      await stripe.redirectToCheckout({ sessionId });

      clearCart();
    } catch (error) {
      console.error("Error during checkout session:", error.response?.data || error.message);
      alert(`Failed to create checkout session: ${error.response?.data?.error?.message || error.message}`);
    }
  };

  return <button onClick={handleCheckout}>Pay Now</button>;
};

export default CheckoutButton;
