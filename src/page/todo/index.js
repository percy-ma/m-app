import { useState, useEffect } from 'react';
import { Input } from '../../components';
import request from '../../api/request';
import './index.scss';

export default function Todo() {
  const getTodoList = () => {
    request.get('/todo/getTodoList').then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div className="content-middle">
      <h3 className="title">Todo</h3>
      <div id="add-box" className="card">
        <Input label="title" />
        <Input label="decription" />
        <div>Priority</div>
        <button className="primary-btn" onClick={getTodoList}>
          ADD
        </button>
      </div>
      <div id="list-box" className="card"></div>
    </div>
  );
}
