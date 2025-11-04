import customFetch from '@/utils/customFetch';

export const createRecord = async (formData: FormData) => {
  return await customFetch.post('/record', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const editRecord = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  return await customFetch.patch(`/record/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const records = async ({
  id,
  category,
  currency,
  from,
  to,
  page,
  limit,
}: {
  id: string;
  category: string;
  currency: string;
  from?: Date;
  to?: Date;
  page: number;
  limit: number;
}) => {
  const {
    data: { records, analysis, count, numOfPages },
  } = await customFetch.get(
    `/record?id=${id}&category=${category}&currency=${currency}&from=${from}&to=${to}&page=${page}&limit=${limit}`
  );
  return { records, analysis, count, numOfPages };
};

export const getRecord = async (id: string) => {
  const { data } = await customFetch.get(`/record/${id}`);
  return data;
};
