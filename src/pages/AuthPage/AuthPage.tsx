import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


type Props = {
  setUserInfo: Function;
};

export const AuthPage: React.FC<Props> = ({setUserInfo}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [age, setAge] = useState("");

  const submit = async () => {

    if (!isSignUp) {
      const { data } = await axios.post('http://localhost:8080/login', {
        userName: id,
        userPw: pw
      })
  
      if (!data) {
        alert("잘못된 아아디 또는 비밀번호");
      } else {
        // 가상 jwt 생성 (서버에서 받았다고 가정)
        localStorage.setItem("accessToken", data);
        location.replace('/');
      }

      setUserInfo();

    } else {
      const {data} = await axios.post('http://localhost:8080/signup', {
        userName: id,
        userPw: pw,
        userAge: age
      })

      if (!data) {
        alert("중복된 계정 등록");
      } else {
        localStorage.setItem("accessToken", data);
        location.replace('/');
      }

      setUserInfo();

    }
  }

  return (
      <Container>
        <Card>
          {
            isSignUp ?
            <h1>SIGN UP</h1>
            :
            <h1>SIGN IN</h1>
          }
          <Input type="text" placeholder="ex) exampleName" onChange={(e) => setId(e.target.value)}></Input>
          <Input type="text" placeholder="ex) examplePw" onChange={(e) => setPw(e.target.value)}></Input>
          {
            isSignUp &&
            <Input type="text" placeholder="ex) exampleAge" onChange={(e) => setAge(e.target.value)}></Input>
          }
          <Button onClick={submit}>Done</Button>
          {
            isSignUp ?
            <p style={{cursor: "pointer", color: "blue"}} onClick={() => setIsSignUp(false)}>Do you need sign in?</p>
            :
            <p style={{cursor: "pointer", color: "blue"}} onClick={() => setIsSignUp(true)}>Do you need sign up?</p>
          }
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

  // &:hover {
  //   background-color: rgba(255, 255, 255, 0.7);
  // }
`;