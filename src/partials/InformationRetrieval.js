import React, { useState, useCallback } from "react";
import {
  WiredCard,
  WiredButton,
  WiredInput,
  WiredItem,
  WiredCombo
} from "wired-elements-react";

import { cities } from "../stub";

const InformationRetrieval = ({ onNext }) => {
  const [data, setData] = useState({});

  const handleInputChange = useCallback(
    (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    },
    [data]
  );

  const handleCityChange = useCallback(
    (e) => {
      setData({ ...data, city: e.target.value.value });
    },
    [data]
  );

  const handleNextClick = useCallback(() => {
    onNext({ clientInfo: data });
  }, [data, onNext]);

  return (
    <section>
      <WiredCard>
        <WiredInput
          name="name"
          placeholder="Your name"
          onChange={handleInputChange}
        />
        <WiredInput
          name="street"
          placeholder="Street name"
          onChange={handleInputChange}
        />
        <WiredInput
          name="house"
          placeholder="House number"
          onChange={handleInputChange}
        />
        <WiredInput
          name="postal"
          placeholder="Postal code"
          onChange={handleInputChange}
        />
        <div className="city-combo">
          <WiredCombo onselected={handleCityChange}>
            {cities.map(({ id, name }) => (
              <WiredItem key={id} value={id}>
                {name}
              </WiredItem>
            ))}
          </WiredCombo>
        </div>
      </WiredCard>
      <WiredButton elevation={2} onClick={handleNextClick}>
        Next
      </WiredButton>
    </section>
  );
};

export default InformationRetrieval;
