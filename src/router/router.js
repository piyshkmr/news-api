const express = require("express");
const Post = require("../db/model");
const multer = require("multer");
const storage = multer.memoryStorage();
const uploads = multer({ storage });
const imageProcess = require("../../utils/imageProcess");

const router = express.Router();

router.post("/create", uploads.single("thumbnail"), async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const newPost = new Post({
      title,
      content,
      category,
    });

    const filename = await imageProcess(req, newPost.id);
    newPost.thumbnail = filename;
    await newPost.save();

    res.status(201).send(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/posts", async (req, res) => {
  const posts = await Post.find().limit(20);
  posts.forEach((post) => {
    post.content = post.content.slice(0, 100) + " ...";
  });
  res.json({ success: true, results: posts });
});

router.get("/posts/:category", async (req, res) => {
  const posts = await Post.find({ category: req.params.category }).limit(20);
  posts.forEach((post) => {
    post.content = post.content.slice(0, 100) + " ...";
  });
  res.json({ success: true, results: posts });
});

router.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

module.exports = router;
