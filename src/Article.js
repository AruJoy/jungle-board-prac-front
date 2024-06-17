import React from 'react';
import './App.css';

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      <div>{props.body}</div>
    </article>
  );
}

export default Article;
