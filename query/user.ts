import { changePassword, updateUser } from '@/api/user';
import { useMutation } from '@tanstack/react-query';

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateUser({ id, formData }),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};
