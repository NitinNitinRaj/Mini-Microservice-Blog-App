import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

export default function App() {
  return (
    <div className="container h-screen m-auto">
      <CreatePost />
      <PostList />
    </div>
  );
}
