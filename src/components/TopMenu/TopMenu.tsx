import React from 'react';
import styled from 'styled-components';

type Props = {
};

export const TopMenu: React.FC<Props> = () => {
  return (
      <Container>
        <Text>로그인</Text>
        <Text>로그아웃</Text>
        <Text>회원가입</Text>
      </Container>
  );
};

const Container = styled.div`
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
`