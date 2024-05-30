import React, { useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { signup } from "../api/auth";

interface SignupParams {
  nickname: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

const Signup: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation: UseMutationResult<AuthResponse, Error, SignupParams> =
    useMutation(signup);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ nickname, email, password });
  };

  return (
    <div>
      <h2>Join</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Join successful!</p>}
    </div>
  );
};
