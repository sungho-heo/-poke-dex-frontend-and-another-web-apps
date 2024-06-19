import React, { useState } from "react";
import {
  useQuery,
  useQueries,
  UseQueryResult,
  useMutation,
} from "@tanstack/react-query";
import { fetchPokemonList, fetchPokemon, PokemonData } from "../api";
import { addFav, removeFav } from "../api/fav";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import {
  Container,
  GridContainer,
  PokemonCard,
  PokemonImage,
} from "../styles/CommonStyles";
import { useAuth } from "../context/AuthContext";

// Css 세팅
const SearchInput = styled.input`
  padding: 10px;
  margin: 20px 0;
  width: 100%;
  max-width: 400px;
  font-size: 16px;
`;

const FavButton = styled.button<{ $isFav: boolean }>`
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
  color: ${(props) => (props.$isFav ? "gold" : "grey")};
  font-size: 1.5rem;
`;

// 포켓몬 데이터 가져오기 1세대 150번까지
const PokemonList: React.FC = () => {
  const [searchPokemon, setSearchPokemon] = useState<string>("");
  const { token, fav = [], setFav } = useAuth();

  const {
    data: listData,
    error: listError,
    isLoading: listLoading,
  }: UseQueryResult<{ results: { name: string }[] }> = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => fetchPokemonList(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // 포켓몬 각 이름에 해당하는 상세 데이터 받아오기
  // query를 2번 해야해서 useQueries를 사용하였음. listData값을 받아오면 result값을 반환 아니면 빈 리스트를 반환하도록.
  const pokemonQueries = useQueries({
    queries: (listData?.results || []).map((pokemon) => ({
      queryKey: ["pokemon", pokemon.name],
      queryFn: () => fetchPokemon(pokemon.name),
      staleTime: 1000 * 60 * 5, // 5 minutes
    })),
    // query를 한번 사용할때는 해당 query의 타입을 설정하면 되지만, 2개의 query를 요청을 할때는 타입지정을 해줘야한다.
    // UseQueryResult가 해당 역할을 해줌.
  }) as UseQueryResult<PokemonData>[];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPokemon(event.target.value);
  };

  const addFavMutation = useMutation({
    mutationFn: (pokemonName: string) => addFav(token!, pokemonName),
    onSuccess: (data: { fav: string[] }) => {
      setFav(Array.isArray(data.fav) ? data.fav : []);
    },
  });

  const removeFavMutation = useMutation({
    mutationFn: (pokemonName: string) => removeFav(token!, pokemonName),
    onSuccess: (data: { fav: string[] }) => {
      setFav(Array.isArray(data.fav) ? data.fav : []);
    },
  });

  const toggleFav = (name: string) => {
    if (Array.isArray(fav) && fav.includes(name)) {
      removeFavMutation.mutate(name);
    } else {
      addFavMutation.mutate(name);
    }
  };

  const filterPokemonQueries = searchPokemon
    ? pokemonQueries.filter((query) =>
        query.data?.name.toLowerCase().includes(searchPokemon.toLowerCase())
      )
    : pokemonQueries;

  if (listLoading) return <Container>...Loading</Container>;
  if (listError instanceof Error)
    return <Container>Error: {listError.message}</Container>;

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="포켓몬 이름을 검색하세요."
        value={searchPokemon}
        onChange={handleSearch}
      />
      <GridContainer>
        {filterPokemonQueries.map((query, index) => {
          const { data, error, isLoading } = query;

          if (isLoading)
            return <PokemonCard key={index}>Loading...</PokemonCard>;
          if (error instanceof Error)
            return (
              <PokemonCard key={index}>Error: {error.message}</PokemonCard>
            );
          const isFav = Array.isArray(fav) && fav.includes(data?.name || "");

          return (
            // data?해당 뜻은 포켓몬 api로부터 데이터를 못가져올경우 undifinded로 가져오게하기위해서 즉 에리가 발생하기위해서임.
            <PokemonCard key={data?.name}>
              <FavButton
                $isFav={isFav}
                onClick={() => toggleFav(data?.name || "")}
              >
                <FontAwesomeIcon icon={isFav ? solidStar : regularStar} />
              </FavButton>
              <h2>{data?.name}</h2>
              <Link to={`/pokemon/${data?.name}`}>
                <PokemonImage
                  src={data?.sprites.front_default}
                  alt={data?.name}
                />
              </Link>
              <p>
                Type:
                {data?.types.map((typeInfo) => typeInfo.type.name).join(",")}
              </p>
            </PokemonCard>
          );
        })}
      </GridContainer>
    </Container>
  );
};

export default PokemonList;
