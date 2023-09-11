import { useDispatch, useSelector } from "react-redux";
import { setTitle, useAddPostMutation } from "../store";

export default function CreatePost() {
  const dispatch = useDispatch();
  const [addPost, result] = useAddPostMutation();
  const title = useSelector((state) => state.postForm.title);
  const handleOnChange = (e) => {
    dispatch(setTitle(e.target.value));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    addPost(title);
    dispatch(setTitle(""));
  };
  return (
    <div className="flex justify-center py-3 m-auto border-b">
      <div className="flex flex-col">
        <h3 className="text-4xl font-semibold">Create Post</h3>
        <form
          className="flex flex-col items-start py-3"
          onSubmit={handleOnSubmit}
        >
          <label className="text-lg">Title</label>
          <input
            className="border rounded my-2 h-9 w-96"
            type="text"
            value={title}
            onChange={handleOnChange}
          />
          <button className="border rounded-lg px-3 py-1 mt-2 text-white bg-blue-500">
            Submit
          </button>
          {result.isError && <p>Error adding new comment</p>}
        </form>
      </div>
    </div>
  );
}
