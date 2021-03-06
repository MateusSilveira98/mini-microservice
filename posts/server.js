const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (request, response) => {
    response.send(posts);
});

app.post('/posts', (request, response) => {
    const id = randomBytes(4).toString('hex');
    const { title } = request.body;

    posts[id] = {
        id,
        title
    };

    response.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('posts server at port 4000');
});