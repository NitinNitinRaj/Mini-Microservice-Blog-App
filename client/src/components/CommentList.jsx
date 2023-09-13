function CommentList({ comments }) {
  const content = comments.map((comment) => (
    <li className="p-0.5 ml-5" key={comment.id}>
      {comment.status === "pending"
        ? "This Comment is awaiting moderation."
        : comment.status === "rejected"
        ? "This Comment has been rejected."
        : comment.content}
    </li>
  ));
  return <div>{content}</div>;
}

export default CommentList;
