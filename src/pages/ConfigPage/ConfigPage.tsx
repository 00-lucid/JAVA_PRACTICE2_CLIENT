import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


type Props = {
};

export const ConfigPage: React.FC<Props> = () => {
  const [newName, setNewName] = useState('');

  const submit = async () => {
    const { data } = await axios.patch('http://localhost:8080/update', {
      userName: newName
    }, {
      headers: {
        authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    })

    location.replace('/');
  }

  return (
      <Container>
        <Card>
          <h1>Config</h1>
          <h3>새로운 이름을 입력하세요</h3>
          <Input type="text" placeholder="ex) exampleName" onChange={(e) => setNewName(e.target.value)}></Input>
          <Button onClick={submit}>Done</Button>
        </Card>
      </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #141414;
  width: 100%;
  margin: 0px auto;
  min-height: 100vh;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 450px;
  background-color: white;
  padding: 1.3rem;
`

const Input = styled.input`
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  padding: 0.3rem;
  height: 2rem;
`

const Button = styled.button`
  color: black;
  border: 1px solid black;
  background-color: white;
  width: 100%;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.2px;
  height: 40px;
  padding: 0px 16px;
  cursor: pointer;

  // &:hover {
  //   background-color: rgba(255, 255, 255, 0.7);
  // }
`;