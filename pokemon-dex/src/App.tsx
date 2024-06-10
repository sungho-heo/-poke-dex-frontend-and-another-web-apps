import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import queryClient from "./queryClient";
import { createGlobalStyle } from "styled-components";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import Header from "./components/Header";
import Profile from "./components/Profile";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 라우터 설정. */}
      <Router>
        <AuthProvider>
          <div className="App">
            <GlobalStyle />
            <Header />
            <Routes>
              <Route path="/" element={<PokemonList />} />
              <Route path="/pokemon/:name" element={<PokemonDetail />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

// css
// 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
      margin: 0;
  }

  :root{
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;

    text-align: center;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  a:hover {
    color: #535bf2;
  }
`;

export default App;
