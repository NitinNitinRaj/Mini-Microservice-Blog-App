const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  } else if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  } else if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    let comments = post.comments;
    comments = comments.filter((comment) => comment.id !== id);
    comments.push({ id, content, status });
    post.comments = comments;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

app.get("/posts", (req, res) => {
  res.send(posts).status(200);
});

app.listen(4002, async () => {
  console.log("Listing on port: 4002");
  await axios
    .get("http://localhost:4005/events")
    .then((res) => {
      for (let event of res.data) {
        console.log("Processing event:", event.type);
        handleEvent(event.type, event.data);
      }
    })
    .catch((err) => console.log(err));
});
