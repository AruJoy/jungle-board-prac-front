import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ postId, onCommentSubmit, parentCommentId = null }) {
  const [contents, setContents] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`http://jungle5105.xyz:10000/api/comment/${postId}`, {
      contents,
      parentCommentId
    }, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}` // Ensure 'Bearer' is included
      }
    }).then(response => {
      console.log(response.data);
      onCommentSubmit(response.data);
      setContents('');
    }).catch(error => {
      console.error('There was an error submitting the comment!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="comment">댓글 작성</label>
        <textarea
          id="comment"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          required
        />
      </div>
      <button type="submit">댓글 달기</button>
    </form>
  );
}

export default CommentForm;
