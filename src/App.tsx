import { TopMenu } from './components/TopMenu';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { CheerUpPage } from './pages/CheerUpPage';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { ConfigPage } from './pages/ConfigPage';
import axios from 'axios';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  const [bells, setBell] = useState([{ text: undefined }]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {

    if (localStorage.getItem('accessToken')) {
      axios.get('http://localhost:8080/info', {
        headers: {
          authorization: localStorage.getItem('accessToken')
        }
      })
      .then(res => {
        console.log(res.data);
        setUserInfo(res.data);
      })
    }
      
  }, [])

  return (
    <>
    <BrowserRouter>
      <GlobalStyle />
      <ContainerBell>{bells.map(bell => bell.text && <Bell key={bell.text}>{bell.text}</Bell>)}</ContainerBell>
      <TopMenu userInfo={userInfo}/>
    <Route path="/" exact>
      <CheerUpPage bells={bells} setBell={setBell} userInfo={userInfo}/>
    </Route>
    <Route path="/auth" exact>
      <AuthPage setUserInfo={setUserInfo}/>
    </Route>
    <Route path="/config" exact>
      <ConfigPage/>
    </Route>
    <Route path="/admin" exact>
      <AdminPage/>
    </Route>
    </BrowserRouter>
    </>
  );
};



const ContainerBell = styled.div`
  display: flex;
  z-index: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
`;

const Bell = styled.div`
  margin-top: 80px;
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
