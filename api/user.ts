import customFetch from '@/utils/customFetch';

export const updateUser = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  return await customFetch.patch(`/user/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const changePassword = async (
  data: Record<string, FormDataEntryValue>
) => {
  return await customFetch.patch(`/user/change-password`, data);
};
