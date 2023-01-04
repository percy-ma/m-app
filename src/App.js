import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';

import User from './page/user';
import Todo from './page/todo';
import GithubUserSearch from './page/githubUserSearch';
import PasswordGenerator from './page/passwordGenerator';
import TicTacToe from './page/ticTacToe';
import Home from './page/home';
import Calendar from './page/calendar';
import Weather from './page/weather';
import Swiper from './page/swiper';
import Website from './page/websites';
import NotFound from './page/404';
import LoginSidebar from './page/userLogin/LoginSidebar';

import { ReducerProvider } from './utils/auth';

export default function App() {
  useEffect(() => {
    document.title = 'APP';

    return () => {};
  });

  return (
    <div className="app">
      <ReducerProvider>
        <BrowserRouter>
          <div className="nav-bar">
            <NavLink to="home">Home</NavLink>
            <NavLink to="user">User</NavLink>
            <div className="group-title">
              <span>APP</span>
            </div>
            <NavLink to="weather">Weather</NavLink>
            <NavLink to="todo">Todo</NavLink>
            <NavLink to="calendar">Calendar</NavLink>
            <NavLink to="swiper">Swiper</NavLink>
            <NavLink to="tic-tac-toe">Tic Tac Toe</NavLink>
            <NavLink to="github-user-search">Github User Search</NavLink>
            <NavLink to="password-generator">Password Generator</NavLink>
            <div className="group-title">
              <span>Collection</span>
            </div>
            <NavLink to="website">Website</NavLink>
            <LoginSidebar />
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="user" element={<User />} />
              <Route path="weather" element={<Weather />} />
              <Route path="todo" element={<Todo />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="swiper" element={<Swiper />} />
              <Route path="tic-tac-toe" element={<TicTacToe />} />
              <Route path="github-user-search" element={<GithubUserSearch />} />
              <Route
                path="password-generator"
                element={<PasswordGenerator />}
              />
              <Route path="website" element={<Website />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ReducerProvider>
    </div>
  );
}
