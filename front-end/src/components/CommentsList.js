function CommentsList({ comments }) {
  return (
    <div>
      <h3>Comments:</h3>
      {comments.map((comment, index) => {
        return (
          <div className="comment" key={index}>
            <h4>{comment.username}</h4>
            <p>{comment.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CommentsList;
