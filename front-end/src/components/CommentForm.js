import React, { useState } from 'react';

function CommentForm({ articleName, setArticleInfo }) {
  const [userName, setUserName] = useState('');
  const [userComment, setUserComment] = useState('');

  const addComment = async () => {
    const result = await fetch(`/api/articles/${articleName}/add-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userName, text: userComment }),
    });
    const response = await result.json();
    //console.log(response);
    setArticleInfo(response);
    setUserName('');
    setUserComment('');
  };

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      <label>
        Name:{' '}
        <input
          type="text"
          name=""
          id=""
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>

      <label>
        Comment:
        <textarea
          name=""
          id=""
          cols="50"
          rows="4"
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
        />
      </label>

      <button onClick={addComment}>Add Comment</button>
    </div>
  );
}

export default CommentForm;
