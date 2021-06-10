import * as React from "react";
import { API_URL } from "../constants";
import { client } from "../utils";

export function useGetTodos(pageNumber = 0) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    setError(false);
    client(`${API_URL}${pageNumber}`)
      .then((todos) => {
        setTodos((prevTodos) => {
          return [...prevTodos, ...todos];
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, [pageNumber]);

  return { loading, error, todos, setTodos };
}
