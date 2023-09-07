import { useFetchPostsQuery } from "../store";
import Post from "./Post";

export default function Posts() {
  const { data, isError, isLoading } = useFetchPostsQuery();
  let content;
  if (isError) {
    content = <div>Error loading post</div>;
  } else if (isLoading) {
    content = <div>Loading....</div>;
  } else {
    content = data.map((post) => {
      return <Post post={post} key={post.id} />;
    });
  }
  return (
    <div className="max-h-[calc(100vh-215px)] overflow-y-auto">
      <div className="flex flex-row flex-wrap justify-center">{content}</div>
    </div>
  );
}
