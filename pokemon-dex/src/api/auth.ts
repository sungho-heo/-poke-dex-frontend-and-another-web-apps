import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

// 회원가입 할때 필요한 데이터의 타입.
export interface SignupParams {
  nickname: string;
  email: string;
  password: string;
}

// 로그인을 진행할때 필요한 데이터 타입.
export interface LoginParams {
  email: string;
  password: string;
}

// user의 토큰 타입.
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
