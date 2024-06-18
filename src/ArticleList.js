import React from 'react';
import './App.css';

function ArticleList({ topics, onClick }) {
  return (
    <div className="card-container">
      {topics.map(topic => (
        <div key={topic.id} className="card">
          <div className="card-header">
            <span className="username">{topic.username}</span>
            <span className="timestamp">{new Date(topic.createdAt).toLocaleString()}</span>
          </div>
          <h3>{topic.title}</h3>
          <p>{topic.contents.substring(0, 100)}...</p>
          <div className="actions">
            <span className="like-count">Likes: {topic.likeCount}</span>
            <a href="/" onClick={(e) => {
              e.preventDefault();
              onClick(topic.id);
            }}>Read More</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticleList;
