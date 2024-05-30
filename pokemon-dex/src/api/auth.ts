import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

interface SignupParams {
  nickname: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

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
