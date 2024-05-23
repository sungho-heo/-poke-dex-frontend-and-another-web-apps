import React from "react";
import { useQuery, useQueries, UseQueryResult } from "@tanstack/react-query";
import { fetchPokemonList, fetchPokemon, PokemonData } from "../api";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const PokemonCard = styled.div`
  border: 2.5px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  display: inline-block;
  width: 200px;
  text-align: center;
`;

const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

const PokemonList: React.FC = () => {
  const {
    data: listData,
    error: listError,
    isLoading: listLoading,
  } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => fetchPokemonList(20),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const pokemonQueries = useQueries({
    queries: (listData?.results || []).map((pokemon) => ({
      queryKey: ["pokemon", pokemon.name],
      queryFn: () => fetchPokemon(pokemon.name),
      staleTime: 1000 * 60 * 5, // 5 minutes
    })),
  }) as UseQueryResult<PokemonData>[];

  if (listLoading) return <Container>...Loading</Container>;
  if (listError instanceof Error)
    return <Container>Error: {listError.message}</Container>;

  return (
    <Container>
      {pokemonQueries.map((query, index) => {
        const { data, error, isLoading } = query;

        if (isLoading) return <PokemonCard key={index}>Loading...</PokemonCard>;
        if (error instanceof Error)
          return <PokemonCard key={index}>Error: {error.message}</PokemonCard>;
        return (
          <PokemonCard key={data?.name}>
            <h2>{data?.name}</h2>
            <Link to={`/pokemon/${data?.name}`}>
              <PokemonImage
                src={data?.sprites.front_default}
                alt={data?.name}
              />
            </Link>
            <p>
              Type:{data?.types.map((typeInfo) => typeInfo.type.name).join(",")}
            </p>
          </PokemonCard>
        );
      })}
    </Container>
  );
};

export default PokemonList;
