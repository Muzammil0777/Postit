// pages/CreatePost.js
import React, { useState } from "react";
import "../Styles/CreatePost.css";

function CreatePost() {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new post on the JSON server
    fetch("http://localhost:8081/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New post created:", data);
        // Reset the form data or navigate to another page
        setPostData({ title: "", content: "", image: null });
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div className="create-post-page">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={postData.content}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
