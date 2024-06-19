import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Article from './Article';
import Login from './Login';
import Signup from './Signup';
import Write from './Write';
import ArticleList from './ArticleList';
import axios from "axios";

function WriteButton(props) {
  if (props.isLogin) {
    return (
      <div className="write-button">
        <button onClick={() => props.setMode('WRITE')}>글쓰기</button>
      </div>
    );
  }
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [isLogin, setIsLogin] = useState(null);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('token') != null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    if (mode === 'WELCOME') {
      axios.get('http://localhost:8080/api/posts')
        .then(response => {
          if (response.data.success) {
            setTopics(response.data.response);
          }
        })
        .catch(error => {
          console.error('There was an error fetching the posts!', error);
        });
    }
  }, [mode]);

  let content = null;
  if (mode === 'WELCOME') {
    content = <ArticleList topics={topics} onClick={(id) => {
      setId(id);
      setMode('READ');
    }} setTopics={setTopics} />
  } else if (mode === 'READ') {
    const topic = topics.find(t => t.id === id);
    if (topic) {
      content = <Article id={Number(topic.id)} title={topic.title} body={topic.contents} />
    } else {
      content = <p>Loading...</p>
    }
  } else if (mode === 'LOGIN') {
    content = <Login onSubmit={(event) => {
      event.preventDefault();
      console.log('Login submitted');
      setMode('WELCOME');
      setIsLogin(true);
    }} />
  } else if (mode === 'SIGNUP') {
    content = <Signup onSubmit={(event) => {
      event.preventDefault();
      console.log('Signup submitted');
      setMode('WELCOME');
    }} />
  } else if (mode === 'WRITE') {
    content = <Write onSubmit={(event) => {
      event.preventDefault();
      console.log('Write submitted');
      setMode('WELCOME');
    }} />
  }

  return (
    <div>
      <Header title="Jungle Board" onChangeMode={setMode} isLogin={isLogin} setIsLogin={setIsLogin} />
      <WriteButton setMode={setMode} isLogin={isLogin} />
      {content}
    </div>
  );
}

export default App;
