export default ({ comments }) => {
  const content = comments.map((comment) => (
    <li className="p-0.5 ml-5" key={comment.id}>
      {comment.content}
    </li>
  ));
  return <div>{content}</div>;
};
