import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "john" },
    }),
  },
}));

test("username input should be render", () => {
  render(<Login />);
  const userInputElement = screen.getByPlaceholderText(/username/i);
  expect(userInputElement).toBeInTheDocument();
});

test("password input should be render", () => {
  render(<Login />);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  expect(passwordInputElement).toBeInTheDocument();
});

test("button should be render", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInputElement = screen.getByPlaceholderText(/username/i);
  expect(userInputElement.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  expect(passwordInputElement.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeDisabled();
});

test("error should not be visible", () => {
  render(<Login />);
  const buttonElement = screen.getByTestId("error");
  expect(buttonElement).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(userInputElement, { target: { value: testValue } });
  expect(userInputElement.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login />);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const passwordValue = "1234567";

  fireEvent.change(passwordInputElement, { target: { value: passwordValue } });
  expect(passwordInputElement.value).toBe(passwordValue);
});

test("button should not be disabled when inputs exist", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);

  const testValue = "test";
  const passwordValue = "1234567";

  fireEvent.change(userInputElement, { target: { value: testValue } });
  fireEvent.change(passwordInputElement, { target: { value: passwordValue } });

  expect(buttonElement).not.toBeDisabled();
});

test("loading should not be render", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).not.toHaveTextContent(/please wait/i);
});

test("loading should be render when click", () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);

  const testValue = "test";
  const passwordValue = "1234567";

  fireEvent.change(userInputElement, { target: { value: testValue } });
  fireEvent.change(passwordInputElement, { target: { value: passwordValue } });
  fireEvent.click(buttonElement);

  expect(buttonElement).toHaveTextContent(/please wait/i);
});

test("loading should not be render after fetching", async () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);

  const testValue = "test";
  const passwordValue = "1234567";

  fireEvent.change(userInputElement, { target: { value: testValue } });
  fireEvent.change(passwordInputElement, { target: { value: passwordValue } });
  fireEvent.click(buttonElement);

  await waitFor(() =>
    expect(buttonElement).not.toHaveTextContent(/please wait/i)
  );
});

test("user should be render after fetching", async () => {
  render(<Login />);
  const buttonElement = screen.getByRole("button");
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);

  const testValue = "test";
  const passwordValue = "1234567";

  fireEvent.change(userInputElement, { target: { value: testValue } });
  fireEvent.change(passwordInputElement, { target: { value: passwordValue } });
  fireEvent.click(buttonElement);

  const userItem = await screen.findByText(/john/i);
  expect(userItem).toBeInTheDocument();
});
