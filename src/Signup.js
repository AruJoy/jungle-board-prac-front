import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Signup(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const request = { username, password, admin };
    console.log('Signup submitted', request);

    axios.post('http://localhost:8080/api/user/signup', request)
      .then(response => {
        console.log(response.data);
        setMessage('회원가입이 성공적으로 완료되었습니다.');
        props.onSubmit(event);
      })
      .catch(error => {
        console.error('There was an error signing up!', error);
        setMessage('회원가입에 실패했습니다.');
      });
  };

  return (
    <div className="auth-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
