import React, { useState, useCallback } from "react";
import { WiredCard, WiredButton, WiredInput } from "wired-elements-react";
import { number, expirationDate, cvv } from "card-validator";
import _ from "lodash";

const PaymentInformation = ({ onNext }) => {
  const [data, setData] = useState({});
  const [validation, setValidation] = useState({
    number: true,
    date: true,
    code: true
  });

  const handleInputChange = useCallback(
    (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
      setValidation({ ...validation, [e.target.name]: true });
    },
    [data, validation]
  );

  const handleNextClick = useCallback(() => {
    const validations = {
      number: number(data.number).isValid,
      date: expirationDate(data.date).isValid,
      code: cvv(data.code).isValid
    };
    const isValid = _.every(validations, _.identity);

    if (isValid) {
      onNext({ paymentInfo: data });
    } else {
      setValidation(validations);
    }
  }, [data, onNext]);

  return (
    <section>
      <WiredCard>
        <WiredInput
          name="number"
          placeholder="Credit card number"
          onChange={handleInputChange}
          style={validation.number ? {} : { color: "red" }}
        />
        {!validation.number && (
          <p className="error">Incorrect credit card number</p>
        )}
        <WiredInput
          name="date"
          type="month"
          onChange={handleInputChange}
          style={validation.date ? {} : { color: "red" }}
        />
        {!validation.date && <p className="error">Incorrect expiration date</p>}
        <WiredInput
          name="code"
          placeholder="CVV"
          type="password"
          onChange={handleInputChange}
          minlength="3"
          maxlength="3"
          style={validation.code ? {} : { color: "red" }}
        />
        {!validation.code && <p className="error">Incorrect CVV code</p>}
      </WiredCard>
      <WiredButton elevation={2} onClick={handleNextClick}>
        Next
      </WiredButton>
    </section>
  );
};

export default PaymentInformation;
