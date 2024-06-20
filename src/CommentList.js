import React from 'react';
import axios from 'axios';

function CommentList({ comments, onDelete }) {
  const handleDelete = (commentId) => {
    axios.delete(`http://jungle5105.xyz:10000/api/comment/${commentId}`, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`
      }
    }).then(response => {
      console.log(response.data);
      onDelete(commentId);
    }).catch(error => {
      console.error('There was an error deleting the comment!', error);
      alert("본인이 작성한 댓글이 아닙니다.")
    });
  };

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <div>
            <span><strong>{comment.username}</strong></span>
            <span> 작성 날짜: {new Date(comment.createdAt).toLocaleString()}</span>
            <span> 수정 날짜: {new Date(comment.modifiedAt).toLocaleString()}</span>
          </div>
          <p>{comment.contents}</p>
          <button onClick={() => handleDelete(comment.id)}>삭제</button>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
