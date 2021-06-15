import React from 'react';
import styled from 'styled-components';

type Props = {
  changeSeat: Function;
};

export const SeatItemList: React.FC<Props> = ({ changeSeat }) => {
  return (
    <Container>
      {Array(50)
        .fill(0)
        .map((el, idx) => (
          <SeatButton onClick={() => changeSeat(idx + 1)} />
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

const SeatButton = styled.button`
  width: 30px;
  height: 30px;

  &:focus {
    border: none;
    background-color: #04dd51;
  }
`;
