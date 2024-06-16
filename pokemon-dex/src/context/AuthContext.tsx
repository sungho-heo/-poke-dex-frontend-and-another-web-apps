import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { fetchFav } from "../api/fav";

// type 설정.
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  login: (token: string) => void;
  logout: (showNotification?: (message: string) => void) => void;
  fav: string[];
  setFav: (fav: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });
  const [fav, setFav] = useState<string[]>([]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

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
  };

  const logout = (showNotification?: (message: string) => void) => {
    setToken(null);
    setFav([]);
    if (showNotification) {
      showNotification("Logout successful!");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        login,
        logout,
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
