import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


type Props = {
};

export const AdminPage: React.FC<Props> = () => {

  const [members, setMembers] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/members')
    .then(res => setMembers(res.data))
    axios.get('http://localhost:8080/reservations')
    .then(res => setReservations(res.data));
  }, [])

  return (
      <Container>
        <Card>
          {
            members.map((member,idx) => <MemberItem key={idx}>{member.userName} {member.userAge} {member.userPw}</MemberItem>)
          }
        </Card>
        <Card>
          {
            reservations.map((reservation,idx) => <MemberItem key={idx}>{reservation.userName} {reservation.movieName} {reservation.seat} {reservation.createDate}</MemberItem>)
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
  flex-direction: column;
  width: 100%;
  background-color: white;
  padding: 1.3rem;
  min-height: 100vh;
  padding-top: 80px;
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

const MemberItem = styled.div`
  width: 100%;
  height: 4rem;
  margin-top: 1px;
  border: 2px solid black;
`