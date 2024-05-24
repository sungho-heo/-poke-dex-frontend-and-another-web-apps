import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import queryClient from "./queryClient";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import "./App.css";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 라우터 설정. */}
      <Router>
        <div className="App">
          <h1>Pokemon Dex</h1>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
