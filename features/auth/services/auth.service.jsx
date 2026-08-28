export async function sendOtp(phone) {
  const res = await fetch("/api/auth/sendOtp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to send OTP");
  }

  return data;
}

export async function verifyOtp(phone, otp) {
  const res = await fetch("/api/auth/verifyOtp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
      otp,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Invalid verification code");
  }

  return data;
}

export async function createSession(phone, id) {
  const res = await fetch("/api/auth/create-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
      id,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to create session");
  }

  return data;
}

export async function logout() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Logout failed");
  }

  return data;
}
