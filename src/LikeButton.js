import React, { useState } from 'react';
import axios from 'axios';

function LikeButton({ postId, fetchPostData }) {
  const [loading, setLoading] = useState(false);

  const handleLike = () => {
    setLoading(true);
    axios.put(`http://jungle5105.xyz:10000/api/likes/post/${postId}`, {}, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`
      }
    }).then(response => {
      console.log(response.data);
      setLoading(false);
      fetchPostData(); // 서버에서 최신 데이터를 받아와서 상태를 업데이트
    }).catch(error => {
      console.error('There was an error liking the post!', error);
      setLoading(false);
    });
  };

  return (
    <button onClick={handleLike} disabled={loading}>
      {loading ? '로딩중...' : '좋아요'}
    </button>
  );
}

export default LikeButton;
