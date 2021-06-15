import React from 'react';
import styled from 'styled-components';

type Props = unknown;

export const ProductList: React.FC<Props> = ({ children }) => <Container>{children}</Container>;

const Container = styled.div`
  width: 100%;
  padding-top: 32px;
  display: flex;
  flex-wrap: wrap;
  place-content: stretch flex-start;

  @media (min-width: 960px) {
    padding-top: 80px;
    max-width: 1176px;
    margin-right: auto;
    margin-left: auto;
  }
`;
