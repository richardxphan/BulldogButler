let isLoggedIn = true;

export const setLoggedIn = (value: boolean) => {
  isLoggedIn = value;
};

export const getLoggedIn = () => isLoggedIn;
