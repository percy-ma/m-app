import { useState } from 'react';
import { Input } from '../../components';
import './index.scss';

export default function Todo() {

  return (
    <div className='content-middle'>
      <h3 className="title">Todo</h3>
      <div id="add-box" className='card'>
        <Input label="title"/>
        <Input label="decription"/>
        <div>Priority</div>
        <button className="primary-btn">ADD</button>
      </div>
      <div id='list-box' className='card'>

      </div>
    </div>
  );
}
