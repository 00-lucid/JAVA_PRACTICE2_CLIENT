import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  userInfo: any;
};

export const TopMenu: React.FC<Props> = ({ userInfo }) => {

  const destroyToken = () => {
    localStorage.removeItem('accessToken');
    location.replace('/');
  }

  const withdraw = async () => {
    const { data } = await axios.delete('http://localhost:8080/withdraw', {
      headers: {
        authorization: localStorage.getItem('accessToken')
      }
    })

    if (!data) {
      alert('잘못된 접근');
    } else {
      destroyToken();
    }
  }

  return (
      <Container>
        <Text style={{position: "absolute", left: 0, marginLeft: "20px"}} onClick={() => location.replace('/')}>MOVIESTATES</Text>
          {localStorage.getItem('accessToken') ? 
          <>
          <Text style={{position: "absolute", left: 0, marginLeft: "140px"}} onClick={() => location.replace('/')}>안녕하세요 {userInfo?.userName}님!</Text>
          <Text onClick={destroyToken}>로그아웃</Text>
          <Link to="/config">
            <Text>회원수정</Text>
          </Link>
          <Text onClick={withdraw}>회원탈퇴</Text>
          </>
          : 
          <Link to="/auth">
            <Text>로그인</Text>
          </Link>
          }

      </Container>
  );
};

const Container = styled.div`
  z-index: 1;
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid white;
  height: 70px;
  background: #141414;
  top: 0;
`

const Text = styled.button`
  color: white;
  margin-right: 20px;
  background: none;
  border: none;
  cursor: pointer;
`