import axios from "axios";

const API_URL = "http://localhost:4000/api/fav";

export const fetchFav = async (token: string) => {
  const response = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addFav = async (token: string, pokemonName: string) => {
  const response = await axios.post(
    `${API_URL}/add`,
    { pokemonName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const removeFav = async (token: string, pokemonName: string) => {
  const response = await axios.delete(`${API_URL}/remove/${pokemonName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
