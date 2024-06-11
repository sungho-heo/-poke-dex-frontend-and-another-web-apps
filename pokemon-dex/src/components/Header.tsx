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

const Message = styled.div`
  color: green;
  margin-top: 10px;
`;

const Header: React.FC = () => {
  const { token, logout, successMessage } = useAuth();

  return (
    <HeaderContainer>
      <Title>
        <NavLink to="/">Pokemon Dex</NavLink>
      </Title>
      <Nav>
        {!token ? (
          <Nav>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </Nav>
        ) : (
          <Nav>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/" onClick={logout}>
              Logout
            </NavLink>
          </Nav>
        )}
      </Nav>
      {successMessage && <Message>{successMessage}</Message>}
    </HeaderContainer>
  );
};

export default Header;
