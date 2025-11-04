import axios from 'axios';

const customFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
  withCredentials: true,
});

export default customFetch;
