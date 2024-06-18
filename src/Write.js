import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Write(props) {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const request = { title, contents };

    console.log('Write submitted', request);

    axios.post('http://localhost:8080/api/post', request, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        console.log(response.data);
        props.onSubmit(event);
      })
      .catch(error => {
        console.error('There was an error submitting the post!', error);
        setMessage('글쓰기에 실패했습니다.');
      });
  }

  return (
    <div className="auth-container">
      <h2>글쓰기</h2>
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
        <div className="form-group">
          <label htmlFor="contents">내용</label>
          <textarea
            id="contents"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            required
          />
        </div>
        <button type="submit">작성</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Write;
