import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MovieProductList } from '../../components';
import { Modal } from '../../components';

type Props = {
  bells: object[];
  setBell: Function;
  userInfo: any;
};

export const CheerUpPage: React.FC<Props> = ({ bells, setBell, userInfo }) => {
  const [modalProduct, setModalProduct] = useState({ moviePhoto: '', movieName: '', movieGenre: '', movieInfo: '' });
  const [product, setProduct] = useState([]);
  useEffect(() => {
    // get movies
    axios
      .get(`http://localhost:8080/movies`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        setProduct(data);
      });
  }, []);

  return (
    <>
      <MovieProductList setModalProduct={setModalProduct} product={product} />
      {modalProduct.moviePhoto && (
        <Modal modalProduct={modalProduct} setModalProduct={setModalProduct} bells={bells} setBell={setBell} userInfo={userInfo}/>
      )}
    </>
  );
};
