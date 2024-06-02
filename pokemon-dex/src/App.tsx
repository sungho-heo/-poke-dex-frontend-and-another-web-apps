import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import queryClient from "./queryClient";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import Profile from "./components/Profile";
import "./App.css";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 라우터 설정. */}
      <Router>
        <div className="App">
          <header>
            <h1>Pokemon Dex</h1>
            <nav>
              <Link to="/">home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              <Link to="/profile">Profile</Link>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
