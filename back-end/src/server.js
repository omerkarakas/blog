import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';

// const articlesInfo = {
//   'learn-react': {
//     upvotes: 0,
//     comments: [],
//   },
//   'learn-node': {
//     upvotes: 0,
//     comments: [],
//   },
//   'my-thoughts-on-resumes': {
//     upvotes: 0,
//     comments: [],
//   },
// };

const app = express();
app.use(express.static(path.join(__dirname, '/build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const PORT = 5000;

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
    });
    const db = client.db('my-blog');
    await operations(db);

    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error in db access', error });
  }
};

app.get('/api/articles/:name', async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;

    const articleInfo = await db
      .collection('articles')
      .findOne({ name: articleName });

    res.status(200).json(articleInfo);
  }, res);
});

app.post('/api/articles/:name/upvote', async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;

    const articleInfo = await db
      .collection('articles')
      .findOne({ name: articleName });
    await db.collection('articles').updateOne(
      { name: articleName },
      {
        $set: {
          upvotes: articleInfo.upvotes + 1,
        },
      }
    );
    const updateArticleInfo = await db
      .collection('articles')
      .findOne({ name: articleName });

    res.status(200).json(updateArticleInfo);
  }, res);
});

app.post('/api/articles/:name/add-comment', (req, res) => {
  const articleName = req.params.name;
  const { username, text } = req.body;
  withDB(async (db) => {
    const articleInfo = await db
      .collection('articles')
      .findOne({ name: articleName });

    await db.collection('articles').updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }),
        },
      }
    );
    const updateArticleInfo = await db
      .collection('articles')
      .findOne({ name: articleName });

    res.status(200).json(updateArticleInfo);
  }, res);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
