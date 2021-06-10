import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  addTodoContainer: { padding: 10 },
  addTodoButton: { marginLeft: 5 },
  todosContainer: {
    marginTop: 10,
    marginBottom: 30,
    padding: 10,
  },
  todoContainer: {
    borderTop: "1px solid #bfbfbf",
    marginTop: 5,
    cursor: "move",
    "&:first-child": {
      margin: 0,
      borderTop: "none",
    },
    "&:hover": {
      "& $deleteTodo": {
        visibility: "visible",
      },
    },
  },
  todoTextCompleted: {
    textDecoration: "line-through",
  },
  deleteTodo: {
    visibility: "hidden",
  },
  loading: {
    fontSize: "2rem",
  },
  error: {
    fontSize: "2rem",
    color: "tomato",
  },
});
