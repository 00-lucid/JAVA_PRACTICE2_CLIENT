import { PRODUCT_LIST } from './__mocks__/product';

export function useCheerUpProductList() {
  const products = PRODUCT_LIST;

  return {
    data: products,
    loading: false,
  };
}
