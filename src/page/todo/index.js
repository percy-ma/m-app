import { useState, useEffect } from 'react';
import { message } from '../../components';
import { Form, Input, Radio } from 'antd';
import request from '../../api/request';
import './index.scss';

export default function Todo() {
  const [priority, setPriority] = useState(1);
  const [todoList, setTodoList] = useState([]);

  const changePriority = (e) => {
    setPriority(e.target.value);
  };

  const addTodo = (values) => {
    console.log(values);
    request
      .post('/todo/addTodo', values)
      .then((res) => {
        console.log(res.data);
        message.success('Add Success!!!');
        getTodoList();
      })
      .catch((err) => {
        message.error('Add Error');
        console.log(err);
      });
  };

  const getTodoList = () => {
    request.get('/todo/getTodoList').then((res) => {
      let data = res.data
      let list = []
      for(let i=0; i<data.length; i++) {
        list.push({
          id: data[i].id,
          title: data[i].title,
          description: data[i].description,
          priority: data[i].priority,
          done: data[i].done
        })
      }
      setTodoList([...list]);
    });
  };

  const setTodoItemDone = (todoItem, setDone, index) => {
    console.log(todoItem.id);
    request
      .post('/todo/updateTodo', {
        id: todoItem.id,
        done: setDone,
      })
      .then(res => {
        if(res.code === 200) {
          let tempTodoList = todoList
          tempTodoList[index].done = setDone
          setTodoList([...tempTodoList])
        }
      });
  };

  return (
    <div className="content-middle">
      <h3 className="title">Todo</h3>
      <div className="todo-container">
        <div id="add-box" className="card">
          <Form onFinish={addTodo} initialValues={{ priority: 1 }}>
            <Form.Item name="title" label="Title">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="priority" label="Priority">
              <Radio.Group value={priority} onChange={changePriority}>
                <Radio value={1}>Low</Radio>
                <Radio value={2}>Medium</Radio>
                <Radio value={3}>High</Radio>
              </Radio.Group>
            </Form.Item>
            <button className="primary-btn" type="submit">
              Submit
            </button>
          </Form>
          <button className="primary-btn" onClick={getTodoList}>
            Get List
          </button>
        </div>
        <div id="list-box" className="card">
          <div className="card-title">Todo List</div>
          {todoList.map((item, index) => {
            return (
              <div className="todo-list-item" key={item.id}>
                <div
                  className="done-dot"
                  onClick={() => setTodoItemDone(item, !item.done, index)}
                ></div>
                <div
                  className={
                    item.done ? 'item-content item-done' : 'item-content'
                  }
                >
                  <div>{item.title}</div>
                  {item.priority === 1 && (
                    <div className="priority priority-low">LOW</div>
                  )}
                  {item.priority === 2 && (
                    <div className="priority priority-medium">MEDIUM</div>
                  )}
                  {item.priority === 3 && (
                    <div className="priority priority-high">HIGH</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
