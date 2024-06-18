import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const request = { username, password };
    console.log('Login submitted', request);

    axios.post('http://localhost:8080/api/user/login', request)
      .then(response => {
        console.log(response.data);
        const token = response.headers['authorization'];
        if (token) {
          sessionStorage.setItem('token', token);
          setMessage('로그인이 성공적으로 완료되었습니다.');
          // axios 인스턴스에 기본 헤더 설정
          axios.defaults.headers.common['Authorization'] = token;
          props.onSubmit(event);
        } else {
          setMessage('로그인에 실패했습니다. 닝겐');
        }
      })
      .catch(error => {
        console.error('There was an error login', error);
        setMessage('로그인에 실패했습니다. 닝겐');
      });
  }

  return (
    <div className="auth-container">
      <h2>로그인</h2>
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
            required />
        </div>
        <button type="submit">로그인</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
