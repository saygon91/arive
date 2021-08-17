import React from "react";
import { WiredCard } from "wired-elements-react";

const OrderConfirmation = ({ payload }) => {
  console.log("payload: ", payload);

  return (
    <section>
      <WiredCard>
        <h3>Your order confirmed</h3>
      </WiredCard>
    </section>
  );
};

export default OrderConfirmation;
