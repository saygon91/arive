import React, { useState, useCallback, useEffect } from "react";
import {
  WiredButton,
  WiredCard,
  WiredListbox,
  WiredItem,
  WiredCheckbox
} from "wired-elements-react";
import _ from "lodash";

import { pizzaTypes, toppingTypes } from "../stub";

import pizza from "../assets/pizza.png";

const PizzaSelection = ({ onNext }) => {
  const [pizzaType, setPizzaType] = useState(2);
  const [toppings, setToppings] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const handlePizzaTypeChange = useCallback((e) => {
    setPizzaType(_.get(e, "detail.selected.value", e.detail.selected));
  }, []);

  const handleToppingTypeChange = useCallback(
    (e) => {
      const checkBoxId = e.srcElement.id;
      const checked = e.detail.checked;

      setToppings({ ...toppings, [checkBoxId]: checked });
    },
    [toppings]
  );

  const handleNextClick = useCallback(() => {
    const data = {
      pizzaType,
      toppings: _.keys(toppings),
      totalPrice
    };
    onNext(data);
  }, [onNext, pizzaType, toppings, totalPrice]);

  useEffect(() => {
    let price = _.find(pizzaTypes, ["id", pizzaType]).price;

    price = _.reduce(
      toppings,
      (acc, value, key) => {
        if (value) {
          const toppingPrice = _.find(toppingTypes, ["id", +key]).price;
          return acc + toppingPrice;
        } else {
          return acc;
        }
      },
      price
    );

    setTotalPrice(price);
  }, [pizzaType, toppings]);

  return (
    <section>
      <WiredCard>
        <img src={pizza} className="pizza-image" alt="pizza" />
        <h4>Total amount: ${totalPrice}</h4>
      </WiredCard>
      <WiredListbox
        horizontal
        selected={pizzaType}
        onselected={handlePizzaTypeChange}
      >
        {pizzaTypes.map(({ id, title, price }) => (
          <WiredItem key={id} value={id}>{`${title} ($${price})`}</WiredItem>
        ))}
      </WiredListbox>
      <WiredCard>
        {toppingTypes.map(({ id, title, price }) => (
          <WiredCheckbox
            key={id}
            id={id}
            onChange={handleToppingTypeChange}
          >{`${title} (+$${price})`}</WiredCheckbox>
        ))}
      </WiredCard>
      <WiredButton className="button" elevation={2} onClick={handleNextClick}>
        Next
      </WiredButton>
    </section>
  );
};

export default PizzaSelection;
