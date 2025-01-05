import { Product, SerializedProduct } from './type';

export function SerializedProduct(product: Product): SerializedProduct {
  return {
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export function SerializedProducts(products: Product[]): SerializedProduct[] {
  return products.map(SerializedProduct);
}
