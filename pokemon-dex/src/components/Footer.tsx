import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #282c34;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const FooterLinks = styled.div`
  margin: 1rem 0;
  a {
    color: #61dafb;
    margin: 0 0.5rem;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterLinks>link</FooterLinks>
      <div>
        &copy; {new Date().getFullYear()} Sungho Heo. All rights reserved.
      </div>
    </FooterContainer>
  );
};

export default Footer;
