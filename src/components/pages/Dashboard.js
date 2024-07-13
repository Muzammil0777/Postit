// pages/Dashboard.js
import React, { useState, useEffect } from "react";
import "../Styles/Dashboard.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  BsEmojiSmile,
  BsEmojiHeartEyes,
  BsEmojiLaughing,
} from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch posts from the JSON server
    fetch("http://localhost:8081/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));

    // Fetch comments from the JSON server
    fetch("http://localhost:8081/comments")
      .then((response) => response.json())
      .then((data) => {
        const commentsObj = {};
        data.forEach((comment) => {
          if (!commentsObj[comment.postId]) {
            commentsObj[comment.postId] = [];
          }
          commentsObj[comment.postId].push(comment);
        });
        setComments(commentsObj);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const toggleLike = (postId) => {
    // Toggle the like state for the post
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const handleCommentSubmit = (postId) => {
    // Add comment to the JSON server
    fetch("http://localhost:8081/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, comment: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: [...(prevComments[postId] || []), data],
        }));
        setNewComment(""); // Clear the new comment input field
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  const toggleEmojiPicker = (postId) => {
    setShowEmojiPicker(showEmojiPicker === postId ? null : postId);
  };

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <h3>{post.title}</h3>
          </div>
          <div className="post-content">
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="Post" />}
          </div>
          <div className="post-actions">
            <button className="like-button" onClick={() => toggleLike(post.id)}>
              {post.liked ? (
                <AiFillHeart color="red" />
              ) : (
                <AiOutlineHeart
                  onMouseEnter={() => toggleEmojiPicker(post.id)}
                  onMouseLeave={() => toggleEmojiPicker(null)}
                />
              )}
              {showEmojiPicker === post.id && (
                <div className="emoji-picker">
                  <BsEmojiSmile />
                  <BsEmojiHeartEyes />
                  <BsEmojiLaughing />
                </div>
              )}
            </button>
            <button
              className="comment-button"
              onClick={() => handleCommentSubmit(post.id)}
            >
              <FaRegCommentDots />
            </button>
            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={handleNewCommentChange}
              />
            </div>
          </div>
          {comments[post.id] && (
            <div className="post-comments">
              <h4>Comments:</h4>
              {comments[post.id].map((comment) => (
                <div key={comment.id} className="comment">
                  <p>{comment.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
