import React from 'react';
import './App.css';

function Header(props) {
  return (
    <header>
      <h1>
        <a href="/" onClick={event => {
          event.preventDefault();
          props.onChangeMode('WELCOME');
        }}>{props.title}</a>
      </h1>
      <div className="auth-buttons">
        <button onClick={() => props.onChangeMode('LOGIN')}>로그인</button>
        <button onClick={() => props.onChangeMode('SIGNUP')}>회원가입</button>
      </div>
    </header>
  );
}

export default Header;
