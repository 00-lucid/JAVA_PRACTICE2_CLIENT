import React from 'react';
import styled from 'styled-components';

type Props = {
  changeSeat: Function;
  arrSeated: number[];
};

export const SeatItemList: React.FC<Props> = ({ changeSeat, arrSeated }) => {
  return (
    <Container>
      {Array(50)
        .fill(0)
        .map((el, idx) => (
          // 만약 서버에서 받은 배열에 존재하는 수의 인덱스는 color=red 스타일을 줘야됨
            arrSeated.includes(idx) ? 
            <SeatButton disabled={true} color={"red"}/>
            :
            <SeatButton onClick={() => changeSeat(idx + 1)}/>
        ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

const SeatButton = styled.button<{ color?: string }>`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color || "white"};

  &:focus {
    border: none;
    background-color: #04dd51;
  }
`;