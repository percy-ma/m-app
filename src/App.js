import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from './page/login'
import GithubUserSearch from "./page/githubUserSearch";
import PasswordGenerator from "./page/passwordGenerator";
import Gobang from './page/gobang'
import Home from "./page/home";
import Calendar from "./page/calendar";

export default function App() {
  useEffect(() => {
    document.title = "APP";

    return () => {};
  });

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="gobang">Gobang</Link>
          <Link to="github-user-search">Github User Search</Link>
          <Link to="password-generator">Password Generator</Link>
        </div>
        <Routes>
          <Route index element={<Home />}/>
          <Route path="login" element={<Login />}/>
          <Route path="calendar" element={<Calendar />} />
          <Route path="gobang" element={<Gobang />} />
          <Route path="github-user-search" element={<GithubUserSearch />} />
          <Route path="password-generator" element={<PasswordGenerator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
