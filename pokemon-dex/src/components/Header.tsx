import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

// css
const HeaderContainer = styled.header`
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

const Nav = styled.nav`
  display: flex;
  gap: 10px;
`;

const Header: React.FC = () => {
  const { token, setToken } = useAuth();

  const handleLogout = () => {
    setToken(null); // 로그아웃 되면 토큰은 null이 됩니다.
  };

  return (
    <HeaderContainer>
      <Title>
        <NavLink to="/">Pokemon Dex</NavLink>
      </Title>
      <Nav>
        {!token && <NavLink to="/login">Login</NavLink>}
        {!token && <NavLink to="/signup">Signup</NavLink>}
        {token && <NavLink to="profile">Profile</NavLink>}
        {token && (
          <NavLink to="/" onClick={handleLogout}>
            Logout
          </NavLink>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
