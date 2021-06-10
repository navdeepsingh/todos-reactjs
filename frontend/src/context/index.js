import * as React from "react";
import { useGetTodos } from "../hooks/use-get-todos";

const TodosContext = React.createContext();
TodosContext.displayName = "TodosContext";

function TodosProvider(props) {
  const [newTodoText, setNewTodoText] = React.useState("");
  const [pageNumber, setPageNumber] = React.useState(0);
  const { loading, error, todos, setTodos, hasMore } = useGetTodos(pageNumber);

  const value = {
    loading,
    error,
    todos,
    hasMore,
    pageNumber,
    newTodoText,
    setTodos,
    setPageNumber,
    setNewTodoText,
  };
  return <TodosContext.Provider value={value} {...props} />;
}

function useTodos() {
  const context = React.useContext(TodosContext);
  if (context === undefined) {
    throw new Error(`useTodos must be used within a TodosProvider`);
  }
  return context;
}

export { TodosProvider, useTodos };
