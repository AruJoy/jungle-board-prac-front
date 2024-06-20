import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import LikeButton from './LikeButton';
import CommentList from './CommentList';
import axios from 'axios';
import './Article.css';

function Article(props) {
  const [comments, setComments] = useState(props.comments);
  const [likeCount, setLikeCount] = useState(props.likeCount);

  const fetchPostData = () => {
    axios.get(`http://jungle5105.xyz:10000/api/post/${props.id}`)
      .then(response => {
        if (response.data.success) {
          const updatedPost = response.data.response;
          setComments(updatedPost.commentList);
          setLikeCount(updatedPost.likeCount); // 서버에서 최신 likeCount 받아옴
        }
      })
      .catch(error => {
        console.error('There was an error fetching the post data!', error);
      });
  };

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
    fetchPostData();
  };

  const handleCommentDelete = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    fetchPostData();
  };

  useEffect(() => {
    fetchPostData();
  }, [props.id]); // []에서 props.id로 변경

  return (
    <div className="card-container">
      <div key={props.id} className="card">
        <div className="card-header">
          <span className="username">{props.username}</span>
          <span className="timestamp">{new Date(props.createdAt).toLocaleString()}</span>
          <span className="like-count">좋아요 {likeCount}</span>
        </div>
        <h3>{props.title}</h3>
        <div className="content">{props.body}</div>
        <LikeButton postId={props.id} fetchPostData={fetchPostData} />
        <CommentList comments={comments} onDelete={handleCommentDelete} />
        <CommentForm postId={props.id} onCommentSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
}

export default Article;
