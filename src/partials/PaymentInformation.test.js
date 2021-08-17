import { fireEvent, render, screen } from "@testing-library/react";

import PaymentInformation from "./PaymentInformation";

test("total price live calculating", () => {
  render(<PaymentInformation />);
  const buttonElement = screen.getByText(/next/i);
  fireEvent.click(buttonElement);
  const errorElement = screen.getByText("Incorrect credit card number");

  expect(errorElement).toBeInTheDocument();
});
