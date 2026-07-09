import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Change these to your own!
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "bayas2026"; //

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage on mount
    const stored = localStorage.getItem("bayas_auth");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        // Simple expiry check — token valid for 7 days
        if (data.expiresAt && Date.now() < data.expiresAt) {
          setUser(data);
        } else {
          localStorage.removeItem("bayas_auth");
        }
      } catch {
        localStorage.removeItem("bayas_auth");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const token = btoa(`${username}:${Date.now()}`); // simple opaque token
      const data = { username, token, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 };
      localStorage.setItem("bayas_auth", JSON.stringify(data));
      setUser(data);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("bayas_auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
