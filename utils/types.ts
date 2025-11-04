export type UserType = {
  _id?: string;
  title: string;
  firstName: string;
  lastName: string;
  email?: string;
  role?: string;
  image?: string;
};

export type RecordType = {
  _id: string;
  amount: number;
  recordType: string;
  image: string;
  category: string;
  currency: string;
  locale: string;
  narration: string;
  createdBy: string;
  createdAt: string;
};

export type CategoryType = {
  _id: string;
  name: string;
};
