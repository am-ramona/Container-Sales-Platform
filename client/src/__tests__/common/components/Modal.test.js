import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../../common/components/Modal/Modal";

test("Renders and opens modal", () => {
  const { getByText } = render(
    <Modal component={<button>Click Me</button>}>Modal Content</Modal>
  );
  const buttonElement = getByText(/Click Me/i);
  buttonElement.click();
  expect(getByText("Modal Content")).toBeTruthy();
});

test("Closes modal by clicking button", () => {
  const { getByText, getByTestId } = render(
    <Modal component={<button>Click Me</button>}>Modal Content</Modal>
  );
  const buttonElement = screen.getByText(/Click Me/i);
  buttonElement.click();
  expect(getByText("Modal Content")).toBeTruthy();
  fireEvent.click(getByTestId("close"));
  expect(screen.queryByText("Modal Content")).toBeNull();
});

test("Renders modal with title", () => {
  const { getByText } = render(
    <Modal title="My Modal" component={<button>Click Me</button>}>
      Modal Content
    </Modal>
  );
  const buttonElement = screen.getByText(/Click Me/i);
  buttonElement.click();
  expect(getByText("My Modal")).toBeTruthy();
});
