import axios from "axios";

const API_URL = "http://localhost:4000/api/fav";

// 로그인한 유저의 즐겨찾기 데이터를 가져온다.
export const fetchFav = async (token: string) => {
  const response = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.fav;
};

// 유저가 추가한 포켓몬 즐겨찾기를 추가한다.
export const addFav = async ({
  token,
  pokemonName,
}: {
  token: string;
  pokemonName: string;
}) => {
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

// 유저가 포켓몬의 즐겨찾기를 해제한다.
export const removeFav = async ({
  token,
  pokemonName,
}: {
  token: string;
  pokemonName: string;
}) => {
  const response = await axios.delete(`${API_URL}/remove/${pokemonName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
