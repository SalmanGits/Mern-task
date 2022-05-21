const express = require("express");
const router = express.Router();

const Todo = require("../models/Todos");

router.get("/", (req, res) => {
  res.send("hello");
});
router.get("/todos", async (req, res) => {
  const todo = await Todo.find({});
  res.send(todo);
});
router.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Todo.findOne({ _id: id });

    res.send(updated);
  } catch (err) {
    res.send(err);
  }
});

router.post("/todos", (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      desc: req.body.desc,
    });

    todo.save().then((data) => {
      res.send(data);
    });
  } catch (err) {
    res.send(err);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });

    res.send(updated);
  } catch (err) {
    res.send(err);
  }
});
router.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await Todo.findByIdAndDelete(id);
    res.send(deleteUser);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
