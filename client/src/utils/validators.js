export const checkValidEmailFormat = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const checkValidPasswordFormat = (password) => {
  return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/.test(
    password
  );
};
