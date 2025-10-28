import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../components/App";

test("renders the shopping list app", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /shopster/i })).toBeInTheDocument();
});

test("filters items based on search input", async () => {
  render(<App />);
  
  const searchInput = screen.getByPlaceholderText("Search...");
  
  // Type in search input
  await userEvent.type(searchInput, "Yogurt");
  
  // Check that only Yogurt is displayed
  expect(screen.getByText("Yogurt")).toBeInTheDocument();
  expect(screen.queryByText("Pomegranate")).not.toBeInTheDocument();
});

test("adds new item when form is submitted", async () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name:/i);
  const categorySelect = screen.getByLabelText(/category:/i);
  const submitButton = screen.getByRole("button", { name: /add to list/i });
  
  // Fill out form
  await userEvent.type(nameInput, "Apple");
  fireEvent.change(categorySelect, { target: { value: "Produce" } });
  
  // Submit form
  fireEvent.click(submitButton);
  
  // Check that new item appears in the list
  expect(screen.getByText("Apple")).toBeInTheDocument();
});

test("form inputs are controlled", async () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name:/i);
  const categorySelect = screen.getByLabelText(/category:/i);
  
  // Check initial values
  expect(nameInput.value).toBe("");
  expect(categorySelect.value).toBe("Produce");
  
  // Type in name input
  await userEvent.type(nameInput, "Test Item");
  expect(nameInput.value).toBe("Test Item");
  
  // Change category
  fireEvent.change(categorySelect, { target: { value: "Dairy" } });
  expect(categorySelect.value).toBe("Dairy");
});

test("search input is controlled", async () => {
  render(<App />);
  
  const searchInput = screen.getByPlaceholderText("Search...");
  
  // Check initial value
  expect(searchInput.value).toBe("");
  
  // Type in search input
  await userEvent.type(searchInput, "test search");
  expect(searchInput.value).toBe("test search");
});