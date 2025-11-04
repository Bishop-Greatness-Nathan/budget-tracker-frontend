import customFetch from '@/utils/customFetch';

export const register = async (formData: FormData) => {
  return await customFetch.post('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const login = async (data: Record<string, FormDataEntryValue>) => {
  return await customFetch.post('/auth/login', data);
};
