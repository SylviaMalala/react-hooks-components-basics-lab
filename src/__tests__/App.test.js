import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import App from "../components/App";

test("renders without errors", () => {
  expect(() => render(<App />)).not.toThrow();
});

test("renders the shopping list app", () => {
  render(<App />);
  
  // Check for main components
  expect(screen.getByRole("heading", { name: /shopster/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  expect(screen.getByLabelText(/name:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/category:/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /add to list/i })).toBeInTheDocument();
});
