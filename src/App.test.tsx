import { screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { App } from "./App";
import { store } from "./app/store";
import { render } from "./test-utils";

test("renders bot reaction", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/how can i help/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders user action", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const buttonElement = screen.getByText(/i'm bored/i);
  expect(buttonElement).toBeInTheDocument();
});

test("bot answers to bored user", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const buttonElement = screen.getByText(/i'm bored/i);
  buttonElement.click();

  waitFor(() => {
    const answerText = screen.getByText(/have you tried/i);
    expect(answerText).toBeInTheDocument();
  });
});

test("user can reply to bot activity proposition", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const buttonElement = screen.getByText(/i'm bored/i);
  buttonElement.click();

  waitFor(() => {
    const answerActionApprove = screen.getByText(/thanks/i);
    const answerActionDecline = screen.getByText(/maybe/i);
    expect(answerActionApprove).toBeInTheDocument();
    expect(answerActionDecline).toBeInTheDocument();
  });
});

test("bot proposes new activity after user has declined", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const buttonElement = screen.getByText(/i'm bored/i);
  buttonElement.click();

  waitFor(() => {
    const answerActionDecline = screen.getByText(/maybe/i);
    answerActionDecline.click();
    waitFor(() => {
      const allBotAnwers = screen.getAllByText(/have you tried/i);
      expect(allBotAnwers).toEqual(2);
    });
  });
});

test("user can restart after accepting activity", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const buttonElement = screen.getByText(/i'm bored/i);
  buttonElement.click();

  waitFor(() => {
    const answerActionDecline = screen.getByText(/thanks/i);
    answerActionDecline.click();
    waitFor(() => {
      const retryButton = screen.getByText(/i'm bored/i);
      retryButton.click();
      screen.getByText(/thanks/i).click();
    });
  });
});
