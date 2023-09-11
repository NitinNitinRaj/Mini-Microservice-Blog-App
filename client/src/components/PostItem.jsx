import CommentList from "./CommentList";
import CreateComment from "./CreateComment";

export default function PostItem({ title, postId, comments }) {
  return (
    <div className="border rounded-lg bg-gray-50 w-96 h-auto flex flex-col justify-between p-3 m-3">
      <h4 className="text-lg font-bold">{title}</h4>
      <div className="my-2 border-y py-2">
        <p>{`${comments.length} comments`}</p>
        <ul className="list-disc max-h-20 overflow-y-auto mt-1">
          <CommentList comments={comments} />
        </ul>
      </div>
      <CreateComment postId={postId} />
    </div>
  );
}
