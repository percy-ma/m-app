import { useState, useRef } from 'react';
import { Button, Form, Input, message, Select } from '../../components';
import request from '../../api/request';
import './index.scss';

export default function Todo() {
  const [todoList, setTodoList] = useState([]);
  const ref = useRef();

  const clearAddForm = () => {
    ref.current.resetForm();
  };

  const addTodo = (values) => {
    console.log(values);
    request
      .post('/todo/addTodo', values)
      .then((res) => {
        clearAddForm();
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
    request
      .get('/todo/getTodoList')
      .then((res) => {
        let data = res.data;
        let list = [];
        for (let i = 0; i < data.length; i++) {
          list.push({
            id: data[i].id,
            title: data[i].title,
            description: data[i].description,
            priority: data[i].priority,
            done: data[i].done,
          });
        }
        setTodoList([...list]);
      })
      .catch((err) => {
        message.error('Get List Error');
        console.log(err);
      });
  };

  const setTodoItemDone = (todoItem, setDone, index) => {
    console.log(todoItem.id);
    request
      .post('/todo/updateTodo', {
        id: todoItem.id,
        done: setDone,
      })
      .then((res) => {
        if (res.code === 200) {
          let tempTodoList = todoList;
          tempTodoList[index].done = setDone;
          setTodoList([...tempTodoList]);
        } else {
          message.error('Server Error');
        }
      })
      .catch((err) => {
        message.error('Server Error');
        console.log(err);
      });
  };

  const deleteTodoItem = (itemId, index) => {
    request
      .post('/todo/deleteTodo', {
        id: itemId,
      })
      .then((res) => {
        if (res.code === 200) {
          message.success('Delete Success!!');
          let tempTodoList = todoList;
          tempTodoList.splice(index, 1);
          setTodoList([...tempTodoList]);
        } else {
          message.error('Server Error');
        }
      })
      .catch((err) => {
        message.error('Server Error');
        console.log(err);
      });
  };

  return (
    <div className="content-middle">
      <h3 className="title">Todo</h3>
      <div className="todo-container">
        <div id="add-box" className="card">
          <Form ref={ref} onFinish={addTodo}>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please enter your title!',
                },
              ]}
            >
              <Input label="Title"/>
            </Form.Item>
            <Form.Item name="description" >
              <Input label="Description"/>
            </Form.Item>
            <Form.Item
              name="priority"
              rules={[
                {
                  required: true,
                  message: 'Please choose priority!',
                },
              ]}
            >
              <Select
                label="Priority"
                options={[
                  { value: 1, text: 'Low' },
                  { value: 2, text: 'Medium' },
                  { value: 3, text: 'High' },
                ]}
              />
            </Form.Item>
          </Form>
        </div>
        <div id="list-box" className="card">
          <div className="card-title">
            <span>Todo List</span>
            <Button onClick={getTodoList}>Refresh</Button>
          </div>
          {todoList.map((item, index) => {
            return (
              <div className="todo-list-item" key={item.id}>
                <div
                  className="done-dot"
                  onClick={() => setTodoItemDone(item, !item.done, index)}
                >
                  <span className='done-dot-inner'></span>
                </div>
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
                <Button
                  className="delete-btn"
                  onClick={() => deleteTodoItem(item.id, index)}
                >
                  Delete
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
