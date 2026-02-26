import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function useAuth({ redirectTo = null } = {}) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth-check", {
          credentials: "include",
        });

        console.log("STATUS:", res.status);

        if (!res.ok) {
          setUser(null);

          // فقط اگر redirectTo داده شده بود
          if (redirectTo) {
            router.replace(redirectTo);
          }

          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setUser(null);

        if (redirectTo) {
          router.replace(redirectTo);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, redirectTo]);

  return { user, loading };
}

export default useAuth;
