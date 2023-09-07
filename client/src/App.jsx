import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";

export default function App() {
  return (
    <div className="container h-screen m-auto">
      <CreatePost />
      <Posts />
    </div>
  );
}
