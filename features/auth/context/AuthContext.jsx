import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/auth-check", {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return false;
      }

      const data = await res.json();
      setUser(data.user);
      return true;
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        checkAuth,
        updateUser: setUser,
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
