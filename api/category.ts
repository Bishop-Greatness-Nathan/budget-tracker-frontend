import customFetch from '../utils/customFetch';
import { CategoryType } from '../utils/types';

// FETCH CATEGORIES
export const fetchCategories = async (): Promise<CategoryType[]> => {
  const { data } = await customFetch.get('/category');
  return data;
};

// FETCH CATEGORY
export const fetchCategory = async (id: string) => {
  const { data } = await customFetch.get(`/category/${id}`);
  return data;
};

// CREATE CATEGORY
export const createCategory = async (category: string) => {
  return await customFetch.post('/category', { name: category });
};

// EDIT CATEGORY
export const editCategory = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  return await customFetch.patch(`/category/${id}`, { name });
};

// DELETE CATEGORY
export const deleteCategory = async (id: string) => {
  return await customFetch.delete(`/category/${id}`);
};
