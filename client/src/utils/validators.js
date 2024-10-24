export const checkValidEmailFormat = (email) => {
  const trimmedEmail = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
};

export const checkValidPasswordFormat = (password) => {
  const trimmedPassword = password.trim();
  return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(
    trimmedPassword
  );
};
