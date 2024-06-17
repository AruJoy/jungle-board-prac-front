import React, { useState } from 'react';
import './App.css';

function Write(props) {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const request = { title, contents };
    console.log('Write submitted', request);
    // 여기에 글쓰기 API 요청을 추가합니다.
    // 예: axios.post('/api/boards', request).then(response => ...);

    props.onSubmit(event);
  };

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
    </div>
  );
}

export default Write;
