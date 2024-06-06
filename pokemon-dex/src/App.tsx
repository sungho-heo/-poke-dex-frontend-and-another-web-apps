import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import queryClient from "./queryClient";
import styled, { createGlobalStyle } from "styled-components";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import Profile from "./components/Profile";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 라우터 설정. */}
      <Router>
        <div className="App">
          <GlobalStyle />
          <Header>
            <Title>
              <NavLink to="/">Pokemon Dex</NavLink>
            </Title>
            <Nav>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </Nav>
          </Header>
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
// css

// 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #root{
      max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-itmes: center;
  padding: 20px;
  background-color: #282c34;
`;

const Title = styled.h1`
  margin: 0;
  color: white;
`;

const Nav = styled.nav`
  display: flex;
  gap: 10px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  translation: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export default App;
