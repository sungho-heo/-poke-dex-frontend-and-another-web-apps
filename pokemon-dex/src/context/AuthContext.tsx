import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { fetchFav } from "../api/fav";

// type 설정.
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  login: (token: string) => void;
  logout: () => void;
  successMessage: string | null;
  setSuccessMessage: (message: string | null) => void;
  fav: string[];
  setFav: (fav: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fav, setFav] = useState<string[]>([]);

  useEffect(() => {
    const loadFav = async () => {
      if (token) {
        try {
          const fetchedFav = await fetchFav(token);
          setFav(fetchedFav);
        } catch (err) {
          console.error("Failed to fetch fav", err);
        }
      } else {
        setFav([]);
      }
    };
    loadFav();
  }, [token]);

  const login = (token: string) => {
    setToken(token);
    setSuccessMessage("Login successful!");
  };

  const logout = () => {
    setToken(null);
    setSuccessMessage("Logout successful!");
    setFav([]);
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
        fav,
        setFav,
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
