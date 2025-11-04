import { createRecord, editRecord, getRecord, records } from '@/api/record';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useRecords = ({
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
  return useQuery({
    queryKey: ['records', id, category, currency, from, to, page, limit],
    queryFn: () => records({ id, category, currency, from, to, page, limit }),
  });
};

export const useCreateRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createRecord(formData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['records'] }),
  });
};

export const useEditRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      editRecord({ id, formData }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
      const {
        data: { _id },
      } = data;
      queryClient.invalidateQueries({ queryKey: ['record', _id] });
    },
  });
};

export const useGetRecord = (id: string) => {
  return useQuery({
    queryKey: ['record', id],
    queryFn: () => getRecord(id),
  });
};
