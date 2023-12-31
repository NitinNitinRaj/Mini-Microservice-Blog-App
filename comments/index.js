const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id, status: "pending" },
  });
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    let comments = commentsByPostId[postId];
    comments = comments.filter((comment) => comment.id !== id);
    comments.push({ id, content, status });
    commentsByPostId[postId].comments = comments;
    axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: { postId, id, status, content },
    });
  }
  res.send({});
});

app.listen(4001, () => console.log("Listing on 4001"));
