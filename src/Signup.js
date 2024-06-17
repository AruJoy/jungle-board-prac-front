import React from 'react';
import './App.css';

function Signup(props) {
  return (
    <div className="auth-container">
      <h2>회원가입</h2>
      <form onSubmit={props.onSubmit}>
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Signup;
