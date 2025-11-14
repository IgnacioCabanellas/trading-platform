import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  jwt: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) setJwt(token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("jwt", token);
    setJwt(token);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setJwt(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        jwt,
        isAuthenticated: !!jwt,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
