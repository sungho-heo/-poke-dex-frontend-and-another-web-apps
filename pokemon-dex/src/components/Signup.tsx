import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup, SignupParams, AuthResponse } from "../api/auth";
import {
  inputContainer as SignupContainer,
  pageTitle as Title,
  FormGroup,
  Label,
  Input,
  Button,
} from "../styles/CommonStyles";
import { useAuth } from "../context/AuthContext";

interface SignupProps {
  showNotification: (message: string) => void;
}

const Signup: React.FC<SignupProps> = ({ showNotification }) => {
  const { login: singnupUser } = useAuth();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation<AuthResponse, Error, SignupParams>({
    mutationFn: signup,
    onSuccess: (data) => {
      singnupUser(data.token);
      showNotification("Signup successful!");
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      showNotification("Passwords do not match");
      return;
    }
    mutation.mutate({ nickname, email, password });
  };

  return (
    <SignupContainer>
      <Title>Signup</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="Nickname">Nickname</Label>
          <Input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Email">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Password">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Password">Confirm Password</Label>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Signup</Button>
      </form>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
    </SignupContainer>
  );
};

export default Signup;
