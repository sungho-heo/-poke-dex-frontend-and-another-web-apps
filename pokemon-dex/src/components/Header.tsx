import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import Notification from "./Notification";

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
  const { token, logout } = useAuth();
  const [notification, setNotification] = useState<string | null>(null);

  // 알림 매시지
  const showNotification = (message: string) => {
    setNotification(message);
  };

  const handleLogout = () => {
    logout(showNotification);
  };

  return (
    <HeaderContainer>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
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
            <NavLink to="/" onClick={handleLogout}>
              Logout
            </NavLink>
          </Nav>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
