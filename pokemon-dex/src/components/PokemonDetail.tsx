import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "../api";
import styled from "styled-components";
import { Container } from "../styles/CommonStyles";

// css세팅
const DetailCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 10px auto;
  width: 300px;
  text-align: center;
`;

const PokemonImage = styled.img`
  width: 150px;
  height: 150px;
`;

// pokemon useQuery및 데이터 가져오기.
const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemon(name!),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) return <Container>Loading...</Container>;
  if (error instanceof Error)
    return <Container>Error:{error.message}</Container>;

  return (
    <Container>
      <DetailCard>
        <h2>{data?.koreaName}</h2>
        <PokemonImage src={data?.sprites.front_default} alt={data?.name} />
        <p>키: {data?.height}</p>
        <p>몸무게: {data?.weight}</p>
        <p>
          타입: {data?.types.map((typeInfo) => typeInfo.type.name).join(",")}
        </p>
      </DetailCard>
    </Container>
  );
};

export default PokemonDetail;
