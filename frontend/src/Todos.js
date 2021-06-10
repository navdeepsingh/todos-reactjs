import * as React from "react";
import { Container, Typography } from "@material-ui/core";
import TodosList from "./components/TodosList";
import TodoAdd from "./components/TodoAdd";
import { TodosProvider } from "./context";

import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

function Todos() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom>
          Todos
        </Typography>
        <TodosProvider>
          <TodoAdd />
          <TodosList />
        </TodosProvider>
      </Container>
    </ErrorBoundary>
  );
}

export default Todos;
