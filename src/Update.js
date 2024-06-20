import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Update(props) {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (props.title && props.contents) {
      setTitle(props.title);
      setContents(props.contents);
    }
  }, [props.title, props.contents]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const request = { title, contents };

    console.log('Update submitted', request);

    axios.put(`http://jungle5105.xyz:10000/api/post/${props.id}`, request, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      },
    })
      .then(response => {
        console.log(response.data);
        props.onSubmit(event);
      })
      .catch(error => {
        console.error('There was an error submitting the post!', error);
        setMessage('수정에 실패했습니다.');
      });
  }

  return (
    <div className="auth-container">
      <h2>글 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group form-group-contents">
          <label htmlFor="contents">내용</label>
          <textarea
            id="contents"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            required
          />
        </div>
        <button type="submit">수정</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Update;
