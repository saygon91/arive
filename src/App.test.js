import { fireEvent, render, screen } from "@testing-library/react";

import App from "./App";

test("renders without crashing", () => {
  render(<App />);
  const titleElement = screen.getByText(/Pizza Delivery/i);
  expect(titleElement).toBeInTheDocument();
});

test("next button changes step", () => {
  render(<App />);
  const buttonElement = screen.getByText(/next/i);
  fireEvent.click(buttonElement);
  const optionElement = screen.getByText(/berlin/i);

  expect(optionElement).toBeInTheDocument();
});

test("total price live calculating", () => {
  render(<App />);
  const element = screen.getByText(/Small/i);
  fireEvent.click(element);
  const totalPrice = screen.getByRole("heading", { name: /Total price: $15/i });

  expect(totalPrice).toBeInTheDocument();
});
