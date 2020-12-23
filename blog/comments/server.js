const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (request, response) => {
    const postId = request.params.id;

    response.send(commentsByPostId[postId]);
});

app.post('/posts/:id/comments', (request, response) => {
    const commentId = randomBytes(4).toString('hex');
    const postId = request.params.id;
    const { content } = request.body;

    const comments = commentsByPostId[postId] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[postId] = comments;

    response.status(201).send(commentsByPostId[postId]);
});

app.listen(4001, () => {
    console.log('comments server at port 4000');
});