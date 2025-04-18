let isLoggedIn = false;
let currentUserId: string | null = null;

export const setLoggedIn = (value: boolean, userId?: string) => {
  isLoggedIn = value;
  currentUserId = userId || null;
};

export const getLoggedIn = () => isLoggedIn;
export const getCurrentUserId = () => currentUserId;