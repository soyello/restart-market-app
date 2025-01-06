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

export function serializedProductWithUser(product: any): any {
  if (!product) {
    return null;
  }
  return {
    ...product,
    createdAt: product.createdAt instanceof Date ? product.createdAt.toISOString() : product.createdAt,
    updatedAt: product.updatedAt instanceof Date ? product.updatedAt.toISOString() : product.updatedAt,
    user: {
      ...product.user,
    },
  };
}
