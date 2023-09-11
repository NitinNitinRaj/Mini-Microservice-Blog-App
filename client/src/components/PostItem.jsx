import { useFetchCommentsQuery } from "../store";
import CreateComment from "./CreateComment";

export default function PostItem({ post }) {
  const { data, isLoading, isError } = useFetchCommentsQuery(post.id);
  let content;
  if (isError) {
    content = <div>Error Loading Comments</div>;
  } else if (isLoading) {
    content = <div>Loading comments....</div>;
  } else {
    content = data.map((comment) => (
      <li className="p-0.5 ml-5" key={comment.id}>
        {comment.content}
      </li>
    ));
  }
  return (
    <div className="border rounded-lg bg-gray-50 w-96 h-auto flex flex-col justify-between p-3 m-3">
      <h4 className="text-lg font-bold">{post.title}</h4>
      <div className="my-2 border-y py-2">
        <p>{`${data?.length} comments`}</p>
        <ul className="list-disc max-h-20 overflow-y-auto mt-1">{content}</ul>
      </div>
      <CreateComment postId={post.id} />
    </div>
  );
}
