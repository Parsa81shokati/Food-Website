//کنترل‌کننده‌ی نمایش Login Modal در کل سایت

import LoginSignUpModal from "../../features/auth/components/LoginSignUpModal";
import useAuth from "@/features/auth/hooks/useAuth";

function GlobalLoginModal() {
  const { showLoginModal, setShowLoginModal } = useAuth();

  if (!showLoginModal) return null;

  return (
    <LoginSignUpModal isOpen={showLoginModal} onClose={setShowLoginModal} />
  );
}

export default GlobalLoginModal;
