function CommentList({ comments }) {
  const content = comments.map((comment) => (
    <li className="p-0.5 ml-5" key={comment.id}>
      {comment.status === "pending"
        ? "Comment Status Pending."
        : comment.status === "rejected"
        ? "Comment Rejected."
        : comment.content}
    </li>
  ));
  return <div>{content}</div>;
}

export default CommentList;
