export function validatePhone(phone) {
  if (!phone) {
    return "Phone number is required.";
  }

  if (!/^09\d{9}$/.test(phone)) {
    return "Phone number must be 11 digits starting with 09.";
  }

  return null;
}

export function validateRegister(firstName, lastName) {
  if (!firstName.trim() || !lastName.trim()) {
    return "Please fill in all fields.";
  }

  if (firstName.trim().length < 2 || lastName.trim().length < 2) {
    return "Fields must be at least 2 characters.";
  }

  if (firstName.trim().length > 50 || lastName.trim().length > 50) {
    return "Fields must be less than 50 characters.";
  }

  return null;
}
