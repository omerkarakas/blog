import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import articles from '../article-content';
import ArticlesList from '../components/ArticlesList';
import CommentForm from '../components/CommentForm';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import NotFoundPage from './NotFoundPage';
const ArticlePage = () => {
  const { name } = useParams();
  const article = articles.find((art) => art.name === name);

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const response = await result.json();
      setArticleInfo(response);
    };
    fetchData();
  }, [name]);

  if (!article) {
    return <NotFoundPage />;
  }
  const relatedArticles = articles.filter((article) => article.name !== name);

  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((cont, index) => {
        return <p key={index}>{cont}</p>;
      })}

      <UpvotesSection
        articleName={name}
        upvotes={articleInfo.upvotes}
        setArticleInfo={setArticleInfo}
      />

      <hr />
      <CommentsList comments={articleInfo.comments} />
      <CommentForm articleName={name} setArticleInfo={setArticleInfo} />
      <h2>Related Articles</h2>
      <ArticlesList articles={relatedArticles} />
    </>
  );
};

export default ArticlePage;
