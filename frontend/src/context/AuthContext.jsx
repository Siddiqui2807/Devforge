import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

const getStoredAccessToken = () =>
  localStorage.getItem("access_token") || localStorage.getItem("token");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getStoredAccessToken()
  );

  const login = useCallback((authPayload) => {
    const accessToken =
      typeof authPayload === "string"
        ? authPayload
        : authPayload?.access || authPayload?.token;

    const refreshToken =
      typeof authPayload === "object" ? authPayload?.refresh : null;

    if (!accessToken) {
      return;
    }

    // Keep both keys temporarily for compatibility with existing pages.
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("token", accessToken);

    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }

    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
