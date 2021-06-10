import React from "react";
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
import { API_URL } from "../constants";
import { client } from "../utils";

function TodoListItem({ todo: { id, text, completed }, onToggle, onDelete }) {
  const classes = useStyles();
  const { todos, setTodos } = useTodos();

  function toggleTodoCompleted(id) {
    client(`${API_URL}${id}`, {
      data: {
        completed: !todos.find((todo) => todo.id === id).completed,
      },
      method: "PUT",
    }).then(() => {
      const newTodos = [...todos];
      const modifiedTodoIndex = newTodos.findIndex((todo) => todo.id === id);
      newTodos[modifiedTodoIndex] = {
        ...newTodos[modifiedTodoIndex],
        completed: !newTodos[modifiedTodoIndex].completed,
      };
      setTodos(newTodos);
    });
  }

  function deleteTodo(id) {
    client(`${API_URL}${id}`, {
      method: "DELETE",
    }).then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      className={classes.todoContainer}
    >
      <Checkbox
        checked={completed}
        onClick={() => toggleTodoCompleted(id)}
      ></Checkbox>
      <Box flexGrow={1}>
        <Typography
          className={completed ? classes.todoTextCompleted : ""}
          variant="body1"
        >
          {text}
        </Typography>
      </Box>
      <Button
        className={classes.deleteTodo}
        startIcon={<Icon>delete</Icon>}
        onClick={() => deleteTodo(id)}
      >
        Delete
      </Button>
    </Box>
  );
}

export default TodoListItem;
