import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ProductList } from '../ProductList';
import { CheerUpProductItem } from '../MovieProductItem';
type Product = {
  moviePhoto: string;
  movieName: string;
  movieGenre: string;
  movieInfo: string;
};
type Props = {
  setModalProduct: Function;
  product: Product[];
};

export const CheerUpProductList: React.FC<Props> = ({ setModalProduct, product }) => {
  return (
    <Container>
      <ProductList>
        {product.map((item, idx) => (
          <CheerUpProductItem key={idx} product={item} setModalProduct={setModalProduct} />
        ))}
      </ProductList>
    </Container>
  );
};

const Container = styled.div`
  background-color: #141414;
  width: 100%;
  margin: 0px auto;
  min-height: 100vh;
`;
