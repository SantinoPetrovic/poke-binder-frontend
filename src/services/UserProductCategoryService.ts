import { BinderWithCards } from '../types/UserProductCategory';

const USER_PRODUCT_CATEGORY_URL = `${process.env.API_URL}/product-categories`;

export const UserProductCategoryService = {
  async getBinderById(productCategoryUserId: string): Promise<BinderWithCards> {
    const response = await fetch(
      `${USER_PRODUCT_CATEGORY_URL}/get-product-category-user/${productCategoryUserId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    if (!response.ok) throw new Error('Failed to fetch binder');
    return response.json();
  }
};