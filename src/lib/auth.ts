let currentUserId: string | null = null;

export const setLoggedIn = (value: boolean, userId?: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('isLoggedIn', value.toString());
    localStorage.setItem('userId', userId ?? '');
    window.dispatchEvent(new Event('storage')); 
  }
  currentUserId = userId ?? null;
};


export const getLoggedIn = (): boolean => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('isLoggedIn');
    return stored === 'true';
  }
  return false;
};

export const getCurrentUserId = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userId') || null;
  }
  return currentUserId;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
  }
  currentUserId = null;
};
