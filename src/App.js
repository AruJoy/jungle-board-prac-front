import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header';
import Article from './Article';
import Login from './Login';
import Signup from './Signup';
import Write from './Write';

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [isLogin, setIsLogin] = useState(null);
  const topics = [
    { id: 0, title: 'html', body: 'html is ...' },
    { id: 1, title: 'css', body: 'css is ...' },
    { id: 2, title: 'javascript', body: 'javascript is ...' }
  ];

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="Hi" body="Hello WEB" />
  } else if (mode === 'READ') {
    const topic = topics.find(t => t.id === id);
    content = <Article id={Number(topic.id)} title={topic.title} body={topic.body} />
  } else if (mode === 'LOGIN') {
    content = <Login onSubmit={(event) => {
      event.preventDefault();
      console.log('Login submitted');
      setMode('WELCOME');
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
      <Header title="Jungle Board" onChangeMode={setMode} isLogin = {isLogin} />
      <button onClick={() => setMode('WRITE')}>글쓰기</button>
      {content}
    </div>
  );
}

export default App;
