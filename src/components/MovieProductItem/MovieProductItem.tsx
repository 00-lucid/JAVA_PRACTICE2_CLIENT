import React, { useState } from 'react';
import styled from 'styled-components';

type Product = {
  moviePhoto: string;
  movieName: string;
  movieGenre: string;
  movieInfo: string;
};

type Props = {
  product: Product;
  setModalProduct: Function;
};

export const MovieProductItem: React.FC<Props> = ({ product, setModalProduct }) => {
  const openModal = () => {
    const body = document.querySelector('body');
    body?.classList.add('scroll-stop');

    setModalProduct(product);
  };
  return (
    <>
      <Container>
        <CoverImage>
          <img src={product.moviePhoto} alt={product.movieName} />
        </CoverImage>
        <Title>{product.movieName}</Title>
        <CheerUpButton onClick={openModal}>예매하기</CheerUpButton>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  width: 50%;
  height: 500px;
  box-sizing: border-box;
  padding: 12px;
  margin-bottom: 32px;
  flex-direction: column;

  @media (min-width: 960px) {
    width: 25%;
  }
`;

const CoverImage = styled.span`
  flex: 1;
  position: relative;
  border-radius: 3px;
  margin-bottom: 8px;
  overflow: hidden;
  padding-top: 75%;

  img {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.15px;
  margin: 0 0 6px;
  color: white;
  overflow: hidden;
`;

const CheerUpButton = styled.button`
  color: black;
  background-color: white;
  width: 100%;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.2px;
  height: 40px;
  padding: 0px 16px;
  border: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;
