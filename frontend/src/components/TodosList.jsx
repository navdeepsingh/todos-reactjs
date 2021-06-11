import React, { useEffect } from "react";
import { InView } from "react-intersection-observer";
import { Paper, Box } from "@material-ui/core";
import { ReactSortable } from "react-sortablejs";
import { useStyles } from "../styles";
import TodoListItem from "./TodoListItem";
import { useTodos } from "../context";
import { API_URL } from "../constants";
import { client } from "../utils";

function TodosList() {
  const classes = useStyles();
  const { loading, error, todos, setTodos, pageNumber, setPageNumber } =
    useTodos();

  /**
   * Send sort request when todos get any update
   */
  useEffect(() => {
    sortTodos(todos);
  }, [todos]);

  const prefetchTodos = (inView, observedTodo) => {
    console.log(inView);
    if (inView) {
      if (observedTodo.intersectionRatio > 0) {
        setPageNumber(pageNumber + 1);
      }
    }
  };

  function sortTodos(todos) {
    client(`${API_URL}sort`, {
      data: { todos },
    });
  }

  return (
    <>
      <Paper className={classes.todosContainer}>
        {todos.length > 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="stretch"
            className={classes.todosWrapper}
          >
            <ReactSortable list={todos} setList={setTodos}>
              {todos?.map((todo, index) =>
                index === todos.length - 1 && todos.length > 19 ? (
                  <InView
                    onChange={prefetchTodos}
                    triggerOnce
                    threshold={1}
                    delay={1000}
                    key={todo.id}
                  >
                    <TodoListItem todo={todo} />
                  </InView>
                ) : (
                  <TodoListItem key={todo.id} todo={todo} />
                )
              )}
            </ReactSortable>
          </Box>
        )}
        {todos.length === 0 && <Box>No Todo Avialable</Box>}
        {loading && <Box className={classes.loading}>Loading..</Box>}
        {error && (
          <Box className={classes.error}>Oops! Something Went Wrong</Box>
        )}
      </Paper>
    </>
  );
}

export default TodosList;
