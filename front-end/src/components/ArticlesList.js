import React from 'react';
import { Link } from 'react-router-dom';

function ArticlesList({ articles }) {
  return (
    <>
      {articles.map((art, index) => {
        return (
          <Link
            key={index}
            className="article-list-item"
            to={`/article/${art.name}`}
          >
            <h3>{art.title}</h3>
            <p>{art.content[0].substring(0, 200)}...</p>
          </Link>
        );
      })}
    </>
  );
}

export default ArticlesList;
