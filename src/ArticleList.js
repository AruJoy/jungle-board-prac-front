import React from 'react';
import './App.css';
import axios from "axios";

function ArticleList(props) {
  const handleDelete = (event, postId) => {
    event.preventDefault();

    axios.delete(`http://localhost:8080/api/post/${postId}`, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`
      }
    }).then(response => {
      console.log(response.data);
      props.setTopics(prevTopics => prevTopics.filter(topic => topic.id !== postId));
    }).catch(error => {
      console.error('There was an error deleting the post!', error);
      alert('본인이 작성한 글만 삭제할 수 있습니다.');
    });
  }

  const handleUpdate = (e, topic) => {
    e.preventDefault();
    props.setId(topic.id);
    props.setTitle(topic.title);
    props.setContents(topic.contents);
    props.setMode("UPDATE");
  }

  return (
    <div className="card-container">
      {props.topics.map(topic => (
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
              props.onClick(topic.id);
            }}>Read More</a>
            <button onClick={(e) => handleUpdate(e, topic)}>수정</button>
            <button onClick={(e) => handleDelete(e, topic.id)}>삭제</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticleList;
