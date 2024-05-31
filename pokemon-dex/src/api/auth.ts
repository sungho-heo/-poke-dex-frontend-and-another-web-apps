import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export interface SignupParams {
  nickname: string;
  email: string;
  password: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// signup
export const signup = async ({
  nickname,
  email,
  password,
}: SignupParams): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/signup`, {
    nickname,
    email,
    password,
  });
  return response.data;
};

// login
export const login = async ({
  email,
  password,
}: LoginParams): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};
