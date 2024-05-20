import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import PokemonList from "./components/PokemonList";
import "./App.css";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Pokemon Dex</h1>
        <PokemonList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
