import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  inputContainer as LoginContainer,
  pageTitle as Title,
  FormGroup,
  Label,
  Input,
  Button,
} from "../styles/CommonStyles";
import { login, LoginParams, AuthResponse } from "../api/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useMutation<AuthResponse, Error, LoginParams>({
    mutationFn: login,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </form>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Login successful!</p>}
    </LoginContainer>
  );
};

export default Login;
