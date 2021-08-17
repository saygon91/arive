import React, { useCallback, useState } from "react";
import { WiredCard, WiredImage } from "wired-elements-react";

import PizzaSelection from "./partials/PizzaSelection";
import InformationRetrieval from "./partials/InformationRetrieval";
import PaymentInformation from "./partials/PaymentInformation";
import OrderConfirmation from "./partials/OrderConfirmation";

import logo from "./assets/logo.svg";
import "./App.css";

function App() {
  const [step, setStep] = useState(0);
  const [payload, setPayload] = useState({});

  const handleOnNext = useCallback(
    (data) => {
      setPayload({ ...payload, ...data });
      setStep(step + 1);
    },
    [payload, step]
  );

  return (
    <main>
      <WiredCard elevation={5}>
        <WiredImage elevation="8" src={logo} />
        <h1 className="title">Pizza Delivery</h1>
        {step === 0 && <PizzaSelection onNext={handleOnNext} />}
        {step === 1 && <InformationRetrieval onNext={handleOnNext} />}
        {step === 2 && <PaymentInformation onNext={handleOnNext} />}
        {step === 3 && <OrderConfirmation payload={payload} />}
      </WiredCard>
    </main>
  );
}

export default App;
