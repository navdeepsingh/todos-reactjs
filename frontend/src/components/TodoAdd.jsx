import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Icon,
  Paper,
  Box,
  TextField,
  Checkbox,
} from "@material-ui/core";
import { useStyles } from "../styles";
import { useTodos } from "../context";
import { client } from "../utils";
import { API_URL } from "../constants";

function TodoAdd() {
  const classes = useStyles();
  const { todos, setTodos, newTodoText, setNewTodoText } = useTodos();
  const [loading, setLoading] = useState(false);

  function addTodo(text) {
    setLoading(true);
    client(API_URL, {
      data: { text },
    }).then((todo) => {
      setLoading(false);
      setTodos([todo, ...todos]);
    });
    setNewTodoText("");
  }

  return (
    <Paper className={classes.addTodoContainer}>
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1}>
          <TextField
            id="todo-input"
            fullWidth
            value={newTodoText}
            onKeyPress={(event) => {
              if (event.key === "Enter" && newTodoText.length > 0) {
                addTodo(newTodoText);
              }
            }}
            onChange={(event) => setNewTodoText(event.target.value)}
          />
        </Box>
        <Button
          className={classes.addTodoButton}
          startIcon={<Icon>add</Icon>}
          onClick={() => addTodo(newTodoText)}
          aria-label="Add Todo"
          disabled={!newTodoText.length > 0}
        >
          {loading ? <span aria-label="loading">...</span> : "Add"}
        </Button>
      </Box>
    </Paper>
  );
}

export default TodoAdd;
