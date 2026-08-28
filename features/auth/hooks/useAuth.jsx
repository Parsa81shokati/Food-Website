import { AuthContext } from "@/features/auth/context/AuthContext";
import { useContext } from "react";

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export default useAuth;
