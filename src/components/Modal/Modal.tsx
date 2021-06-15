import { SeatItemList } from '../SeatItemList';
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

type ModalProduct = {
  movieName: string;
  moviePhoto: string;
  movieGenre: string;
  movieInfo: string;
};

type Props = {
  modalProduct: ModalProduct;
  setModalProduct: Function;
  bells: object[];
  setBell: Function;
};

export const Modal: React.FC<Props> = ({ modalProduct, setModalProduct, bells, setBell }) => {
  const modalElement = useRef<HTMLInputElement>(null);

  const [isSeat, setIsSeat] = useState(false);
  const [numSeat, setNumSeat] = useState(0);

  const changeSeat = (idx: number) => {
    console.log(idx);
    setNumSeat(idx);
  };

  const scrollStart = () => {
    const body = document.querySelector('body');
    body?.classList.remove('scroll-stop');
  };

  const btnExit = () => {
    scrollStart();

    setModalProduct({ moviePhoto: '', movieName: '' });
  };

  const outsideExit = ({ target }: any) => {
    scrollStart();

    if (modalProduct && !modalElement.current?.contains(target)) setModalProduct({ moviePhoto: '', movieName: '' });
  };

  const openSeat = () => {
    setIsSeat(true);
  };

  const submit = () => {
    if (modalProduct.movieName.length < 20) {
      setBell([...bells, { text: `✓ [${modalProduct.movieName}] 예매 완료` }]);
      setTimeout(() => {
        setBell(bells.slice(1));
      }, 2000);
    } else {
      setBell([...bells, { text: `✓ [${modalProduct.movieName.slice(0, 21) + '...'}] 예매 완료` }]);
      setTimeout(() => {
        setBell(bells.slice(1));
      }, 2000);
    }

    // post reservation
    if (typeof numSeat === 'number') {
      axios
        .post('http://localhost:8080/reservation', {
          userName: 'root',
          movieName: modalProduct.movieName,
          seat: numSeat,
        })
        .then(res => res.data)
        .then(data => {
          btnExit();
        });
    }
  };

  useEffect(() => {
    window.addEventListener('click', outsideExit);
    return () => {
      window.removeEventListener('click', outsideExit);
    };
  }, []);

  return (
    <ContainerModal>
      <ContentModal ref={modalElement}>
        <Top>
          {isSeat ? <Title>관람하실 좌석을 선택하세요</Title> : <Title>예매할 영화를 확인하세요</Title>}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={btnExit}
          >
            <path
              d="M13.7501 12.0001L20.9501 4.8501C21.0501 4.7501 21.0501 4.6001 20.9501 4.5001L19.5001 3.0501C19.4001 2.9501 19.2501 2.9501 19.1501 3.0501L12.0001 10.2501L4.8501 3.0501C4.7501 2.9501 4.6001 2.9501 4.5001 3.0501L3.0501 4.5001C2.9501 4.6001 2.9501 4.7501 3.0501 4.8501L10.2501 12.0001L3.0501 19.1501C2.9501 19.2501 2.9501 19.4001 3.0501 19.5001L4.5001 20.9501C4.6001 21.0501 4.7501 21.0501 4.8501 20.9501L12.0001 13.7501L19.1501 20.9001C19.2501 21.0001 19.4001 21.0001 19.5001 20.9001L20.9001 19.5001C21.0001 19.4001 21.0001 19.2501 20.9001 19.1501L13.7501 12.0001Z"
              fill="white"
            />
          </svg>
        </Top>
        <Mid>
          {isSeat ? (
            <SeatItemList changeSeat={changeSeat}></SeatItemList>
          ) : (
            <>
              <CoverImage>
                <img src={modalProduct.moviePhoto} alt={modalProduct.movieName} />
              </CoverImage>
              <ContentInfo>
                <h3>{modalProduct.movieGenre}</h3>
                <p>
                  {modalProduct.movieName.length < 20
                    ? modalProduct.movieName
                    : modalProduct.movieName.slice(0, 21) + '...'}
                </p>
                <Footer>{modalProduct.movieInfo}</Footer>
              </ContentInfo>
            </>
          )}
        </Mid>
        {isSeat ? (
          <CheerUpButton onClick={submit}>완료</CheerUpButton>
        ) : (
          <CheerUpButton onClick={openSeat}>좌석선택</CheerUpButton>
        )}
      </ContentModal>
    </ContainerModal>
  );
};

const Footer = styled.div`
  color: rgba(255, 255, 255, 0.3);
`;

const fadeIn = keyframes`
  0%
  {
    opacity: 0;
  }

  100%
  {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  0%
  {
    bottom: -300px;
  }

  100%
  {
    bottom: 0;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2rem;
  color: white;
  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const ContentInfo = styled.div`
  color: white;
  flex: 1 0 0;
  padding: 0 15px 0 15px;
`;

const CoverImage = styled.span`
  flex: 0.5;
  position: relative;
  margin: 5px;
  border-radius: 3px;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const Top = styled.div`
  display: flex;
  flex: 1 0 0;
  align-items: center;
  justify-content: space-between;
`;

const Mid = styled.div`
  display: flex;
  flex: 4 0 0;
  margin-bottom: 15px;

  @media (max-width: 1024px) {
    margin-bottom: 0px;
  }
`;

const ContentModal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 2.2rem;
  box-shadow: 0px 0px 20px #000;
  width: 650px;
  height: 450px;
  border-radius: 0.75rem;
  background: ${props => props.color || '#181818'};

  @media (max-width: 1024px) {
    width: 100%;
    height: 300px;
    bottom: 0;
    border-radius: 0.75rem 0.75rem 0 0;
    padding: 1.5rem;
    animation: ${slideIn} 0.2s forwards linear alternate;
  }
`;

const ContainerModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  animation: ${fadeIn} 0.2s forwards linear alternate;
`;

const CheerUpButton = styled.button`
  color: black;
  background-color: white;
  width: 100%;
  border-radius: 3px;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.2px;
  height: 55px;
  padding: 0px 16px;
  border: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;
