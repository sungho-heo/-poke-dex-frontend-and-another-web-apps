import React from "react";
import styled from "styled-components";

// css 세팅
const SearchInput = styled.input`
  padding: 10px;
  margin: 20px 0;
  width: 100%;
  max-width: 400px;
  font-size: 16px;
`;

// type 세팅
interface SearchProps {
  searchPokemon: string;
  setSearchPokemon: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchPokemon, setSearchPokemon }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPokemon(event.target.value);
  };

  return (
    <SearchInput
      type="text"
      placeholder="포켓몬 이름을 입력하세요."
      value={searchPokemon}
      onChange={handleSearch}
    />
  );
};

export default Search;
