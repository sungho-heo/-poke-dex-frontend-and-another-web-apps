import React, { createContext, useContext, useState, ReactNode } from "react";

// type 설정.
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  successMessage: string | null;
  setSuccessMessage: (message: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const login = (token: string) => {
    setToken(token);
    setSuccessMessage("Login successful!");
  };

  const logout = () => {
    setToken(null);
    setSuccessMessage("Logout successful!");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        login,
        logout,
        successMessage,
        setSuccessMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
