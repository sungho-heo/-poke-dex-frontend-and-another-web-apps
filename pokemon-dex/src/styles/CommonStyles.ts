import styled from "styled-components";

// css 기본 세팅
export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
`;
