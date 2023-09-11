import { useFetchPostQuery } from "../store";
import Post from "./PostItem";

export default function PostList() {
  const { data, isError, isLoading } = useFetchPostQuery();
  let content;
  if (isError) {
    content = <div>Error loading post</div>;
  } else if (isLoading) {
    content = <div>Loading....</div>;
  } else {
    content = data.map((post) => {
      return (
        <Post
          postId={post.id}
          title={post.title}
          comments={post.comments}
          key={post.id}
        />
      );
    });
  }
  return (
    <div className="max-h-[calc(100vh-235px)] overflow-y-auto relative">
      <h1 className="text-3xl text-center sticky top-0  border-b p-2 bg-gray-50">
        Posts
      </h1>
      <div className="flex flex-row flex-wrap justify-center">{content}</div>
    </div>
  );
}
