const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Storage for posts and comments
let posts = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/post', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    text: req.body.text,
    comments: []
  };
  posts.push(newPost);
  res.redirect('/');
});

app.post('/comment', (req, res) => {
  const postId = req.body.postId;
  const comment = req.body.comment;
  const post = posts.find(p => p.id == postId);
  if (post) {
    post.comments.push(comment);
  }
  res.redirect('/');
});

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
