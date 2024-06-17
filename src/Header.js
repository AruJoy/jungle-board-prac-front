import React from 'react';
import './App.css';

function LoginHandler(props) {
  if (!props.isLogin) {
    return (
      <div className="auth-buttons">
        <button onClick={() => props.onChangeMode('LOGIN')}>로그인</button>
        <button onClick={() => props.onChangeMode('SIGNUP')}>회원가입</button>
      </div>
    );
  } else {
    return (
      <div className="auth-buttons">
        <button
          onClick={
            () => {
              localStorage.removeItem('token');
              props.onChangeMode('WELCOME');
              props.setIsLogin(false);
            }}>
          로그아웃</button>
      </div>
    );
  }
}
function Header(props) {
  return (
    <header>
      <h1>
        <a href="/" onClick={event => {
          event.preventDefault();
          props.onChangeMode('WELCOME');
        }}>{props.title}</a>
      </h1>
      <LoginHandler isLogin = {props.isLogin} onChangeMode = {props.onChangeMode} setIsLogin = {props.setIsLogin}/>
    </header>
  );
}

export default Header;
