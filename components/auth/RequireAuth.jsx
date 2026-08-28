import React, { useEffect } from "react";
import useAuth from "@/features/auth/hooks/useAuth";

function RequireAuth({ children }) {
  const { user, loading, setShowLoginModal } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      setShowLoginModal(true);
    }
  }, [loading, user, setShowLoginModal]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return children;
}

export default RequireAuth;
