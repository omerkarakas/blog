import React from 'react';
import { BiLike } from 'react-icons/bi';

function UpvotesSection({ articleName, upvotes, setArticleInfo }) {
  const upvoteArticle = async () => {
    const result = await fetch(`/api/articles/${articleName}/upvote`, {
      method: 'POST',
    });
    const response = await result.json();
    setArticleInfo(response);
  };

  return (
    <div id="upvotes-section">
      <p>
        This post has been upvoted {upvotes} times. If you like it too, please
        upvote
      </p>
      <button onClick={() => upvoteArticle()}>
        <BiLike />
      </button>
    </div>
  );
}

export default UpvotesSection;
