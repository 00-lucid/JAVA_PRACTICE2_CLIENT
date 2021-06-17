import { TopMenu } from './components/TopMenu';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { CheerUpPage } from './pages/CheerUpPage';

export const App: React.FC = () => {
  const [bells, setBell] = useState([{ text: undefined }]);

  return (
    <>
      <GlobalStyle />
      <CheerUpPage bells={bells} setBell={setBell} />
      <ContainerBell>{bells.map(bell => bell.text && <Bell key={bell.text}>{bell.text}</Bell>)}</ContainerBell>
      <TopMenu/>
    </>
  );
};



const ContainerBell = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
`;

const Bell = styled.div`
  margin-top: 5px;
  display: flex;
  position: relative;
  background: #04dd51;
  width: 430px;
  height: 3rem;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;

  @media (max-width: 1024px) {
    width: 355px;
    font-size: 0.95rem;
  }
`;
