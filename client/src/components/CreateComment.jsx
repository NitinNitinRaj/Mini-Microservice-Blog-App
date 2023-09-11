import { useState } from "react";
import { useAddCommentsMutation } from "../store";

export default function CreateComment({ postId }) {
  const [comment, setComment] = useState("");
  const [addComment, result] = useAddCommentsMutation();
  const handleOnChange = (e) => {
    setComment(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    addComment({ postId: postId, content: comment });
    setComment("");
  };
  return (
    <form className="flex flex-col items-start mt-3" onSubmit={handleOnSubmit}>
      <label>New Comment</label>
      <input
        className="border rounded w-full h-9"
        type="text"
        value={comment}
        onChange={handleOnChange}
      />
      <button className="border rounded-lg px-2.5 py-1 text-white bg-blue-500 text-sm mt-3">
        Submit
      </button>
      {result.isError && <p>Error adding new comment</p>}
    </form>
  );
}
