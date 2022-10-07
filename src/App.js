import { useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Login from './page/login'
import Todo from './page/todo'
import GithubUserSearch from "./page/githubUserSearch";
import PasswordGenerator from "./page/passwordGenerator";
import TicTacToe from './page/ticTacToe'
import Home from "./page/home";
import Calendar from "./page/calendar";
import Website from "./page/websites";

export default function App() {
  useEffect(() => {
    document.title = "APP";

    return () => {};
  });

  return (
    <div className="app">
      <BrowserRouter>
        <div className="nav-bar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="login">Login</NavLink>
          <div className="group-title">
            <span>APP</span>
          </div>
          <NavLink to="todo">Todo</NavLink>
          <NavLink to="calendar">Calendar</NavLink>
          <NavLink to="tic-tac-toe">Tic Tac Toe</NavLink>
          <NavLink to="github-user-search">Github User Search</NavLink>
          <NavLink to="password-generator">Password Generator</NavLink>
          <div className="group-title">
            <span>Collection</span>
          </div>
          <NavLink to="website">Website</NavLink>
        </div>
        <div className="main-content">
          <Routes>
            <Route index element={<Home />}/>
            <Route path="login" element={<Login />}/>
            <Route path="todo" element={<Todo />}/>
            <Route path="calendar" element={<Calendar />} />
            <Route path="tic-tac-toe" element={<TicTacToe />} />
            <Route path="github-user-search" element={<GithubUserSearch />} />
            <Route path="password-generator" element={<PasswordGenerator />} />
            <Route path="website" element={<Website />} />
            <Route path="*" element={<Home />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
