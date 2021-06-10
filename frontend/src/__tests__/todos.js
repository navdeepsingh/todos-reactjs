import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todos from "../Todos";

//beforeAll(() => jest.spyOn(window, "fetch"));

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

afterEach(cleanup);

test("renders todos component", async () => {
  render(<Todos />);
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

  const inputTodo = screen.getByRole("textbox");
  const addTodoButton = screen.getByRole("button", { name: /add todo/i });

  expect(inputTodo).toBeInTheDocument();
  expect(addTodoButton).toBeInTheDocument();

  expect(inputTodo.value).toBe(""); // empty before
  const demoTodo = "New Todo Task From RTL";
  userEvent.type(inputTodo, demoTodo);
  expect(inputTodo.value).toBe("New Todo Task From RTL"); // not empty after
});

test("can create a todo item", async () => {
  const demoTodo = "New Todo Task From RTL " + Math.random(100);
  render(<Todos />);
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

  const inputTodo = screen.getByRole("textbox");
  const addTodoButton = screen.getByRole("button", { name: /add todo/i });
  userEvent.click(addTodoButton);

  userEvent.type(inputTodo, demoTodo);
  userEvent.click(addTodoButton);
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
});
