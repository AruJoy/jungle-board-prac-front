import logo from './logo.svg';
import './App.css';

function Nav(props) {
  const lis = props.topics.map(t => (
    <li key={t.id}><a href={'/read/' + t.id} onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode(t.id);
    }}>{t.title}</a></li>
  ));
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      <div>{props.body}</div>
    </article>
  );
}

function Header(props) {
  console.log('props', props);
  return (
    <header>
      <h1><a href="/" onClick = {(event)=>{
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  );
}

function App() {
  const topics = [
    {id: 0, title: 'html', body: 'html is ...'},
    {id: 1, title: 'css', body: 'css is ...'},
    {id: 2, title: 'javascript', body: 'javascript is ...'}
  ];
  return (
    <div>
      <Header title="안녕 친구야" onChangeMode = {()=>{
        alert('Header');
      }}/>
      <Nav topics={topics} onChangeMode = {(id)=>{
        alert(id);
      }} />
      <Article title="Hi" body="Hello WEB" />
    </div>
  );
}

export default App;
