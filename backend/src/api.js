/* eslint-disable no-console */
const express = require('express');
const { v4: generateId } = require('uuid');
const database = require('./database');

const app = express();
const MAX_LIMIT = 20;

function requestLogger(req, res, next) {
  res.once('finish', () => {
    const log = [req.method, req.path];
    if (req.body && Object.keys(req.body).length > 0) {
      log.push(JSON.stringify(req.body));
    }
    log.push('->', res.statusCode);
    console.log(log.join(' '));
  });
  next();
}

app.use(requestLogger);
app.use(require('cors')());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Revised GET todos endpoint to fetch results as paginated
 */
app.get('/:page?', async (req, res) => {
  const { page = 0 } = req.params;
  const skip = Number(page * MAX_LIMIT);
  const todos = database.client.db('todos').collection('todos');
  const response = await todos
    .find({})
    .limit(MAX_LIMIT)
    .skip(skip)
    .sort({ order: 1 })
    .toArray();
  res.status(200);
  res.json(response);
});

app.post('/', async (req, res) => {
  const { text } = req.body;

  if (typeof text !== 'string') {
    res.status(400);
    res.json({ message: "invalid 'text' expected string" });
    return;
  }

  const todo = { id: generateId(), text, completed: false };
  await database.client.db('todos').collection('todos').insertOne(todo);
  res.status(201);
  res.json(todo);
});

/**
 * Returned the json instead of response end
 * for PUT and DELETE methods both.
 */
app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== 'boolean') {
    res.status(400);
    res.json({ message: "invalid 'completed' expected boolean" });
    return;
  }

  await database.client
    .db('todos')
    .collection('todos')
    .updateOne({ id }, { $set: { completed } });
  res.status(200);
  res.json({ message: 'success' });
});

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await database.client.db('todos').collection('todos').deleteOne({ id });
  res.status(203);
  res.json({ message: 'success' });
});

/**
 * Sorting endpoint
 */
app.post('/sort', async (req, res) => {
  const { todos } = req.body;

  for (let i = 0; i < todos.length; i += 1) {
    database.client
      .db('todos')
      .collection('todos')
      .updateOne({ id: todos[i].id }, { $set: { order: i + 1 } });
  }

  res.status(200);
  res.json({ message: 'success' });
});

module.exports = app;
