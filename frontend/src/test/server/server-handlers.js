import { rest } from "msw";
import { client } from "../../utils";

const handlers = [
  rest.get(process.env.REACT_API_URL, async (req, res, ctx) => {
    const todos = await client(process.env.REACT_API_URL + "0");
    return res(ctx.json({ todos }));
  }),

  rest.post(process.env.REACT_API_URL, async (req, res, ctx) => {
    const { text } = req.body;
    const todo = await client(process.env.REACT_API_URL, {
      data: { text },
    });
    return res(todo);
  }),
];
export { handlers };
