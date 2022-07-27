import React from 'react';
import ArticlesList from '../components/ArticlesList';
import arts from '../article-content';

function ArticlesPage() {
  return (
    <>
      <h1>Articles</h1>
      <ArticlesList articles={arts} />
    </>
  );
}

export default ArticlesPage;
