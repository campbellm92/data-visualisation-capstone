export const checkValidEmailFormat = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const checkValidPasswordFormat = (password) => {
  const trimmedPassword = password.trim();
  return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(
    trimmedPassword
  );
};
